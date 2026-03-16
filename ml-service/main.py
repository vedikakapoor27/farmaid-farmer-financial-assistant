from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predictor import predict_yield, train_model
import os

app = FastAPI(
    title="FarmAid ML Service 🌾",
    description="Crop Yield Prediction API for FarmAid",
    version="1.0.0"
)

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class CropInput(BaseModel):
    crop_type: str      # Rice, Wheat, Maize, Cotton, Sugarcane
    soil_type: str      # Clay, Sandy, Loamy, Black
    rainfall_mm: float
    temperature_c: float
    fertilizer_kg: float
    area_hectares: float

# Response model
class PredictionOutput(BaseModel):
    crop_type: str
    predicted_yield_tons: float
    yield_per_hectare: float
    recommendation: str

@app.get("/")
def root():
    return {
        "message": "🌾 FarmAid ML Service Running",
        "status": "healthy"
    }

@app.post("/predict", response_model=PredictionOutput)
def predict(data: CropInput):
    try:
        # Train model if not exists
        if not os.path.exists('model/crop_model.pkl'):
            train_model()

        predicted_yield = predict_yield(
            crop_type=data.crop_type,
            soil_type=data.soil_type,
            rainfall_mm=data.rainfall_mm,
            temperature_c=data.temperature_c,
            fertilizer_kg=data.fertilizer_kg,
            area_hectares=data.area_hectares
        )

        yield_per_hectare = round(
            predicted_yield / data.area_hectares, 2
        )

        # Smart recommendation
        if predicted_yield >= 8:
            recommendation = "🟢 Excellent yield expected! Maintain current practices."
        elif predicted_yield >= 5:
            recommendation = "🟡 Good yield expected. Consider increasing fertilizer."
        else:
            recommendation = "🔴 Low yield predicted. Improve irrigation and soil quality."

        return PredictionOutput(
            crop_type=data.crop_type,
            predicted_yield_tons=predicted_yield,
            yield_per_hectare=yield_per_hectare,
            recommendation=recommendation
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/crops")
def get_crops():
    return {
        "crop_types": [
            "Rice", "Wheat", 
            "Maize", "Cotton", "Sugarcane"
        ],
        "soil_types": [
            "Clay", "Sandy", 
            "Loamy", "Black"
        ]
    }

@app.post("/train")
def retrain_model():
    try:
        train_model()
        return {"message": "✅ Model retrained successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))