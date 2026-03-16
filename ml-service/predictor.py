import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Sample training data for crop yield prediction
def generate_sample_data():
    np.random.seed(42)
    n_samples = 500

    data = {
        'crop_type': np.random.choice(
            ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'], 
            n_samples
        ),
        'soil_type': np.random.choice(
            ['Clay', 'Sandy', 'Loamy', 'Black'], 
            n_samples
        ),
        'rainfall_mm': np.random.uniform(200, 1500, n_samples),
        'temperature_c': np.random.uniform(15, 40, n_samples),
        'fertilizer_kg': np.random.uniform(50, 300, n_samples),
        'area_hectares': np.random.uniform(1, 10, n_samples),
    }

    df = pd.DataFrame(data)

    # Generate yield based on features
    df['yield_tons'] = (
        df['rainfall_mm'] * 0.003 +
        df['fertilizer_kg'] * 0.02 +
        df['area_hectares'] * 0.5 +
        np.random.normal(0, 0.5, n_samples)
    ).clip(1, 15).round(2)

    return df


def train_model():
    df = generate_sample_data()

    # Encode categorical columns
    le_crop = LabelEncoder()
    le_soil = LabelEncoder()

    df['crop_encoded'] = le_crop.fit_transform(df['crop_type'])
    df['soil_encoded'] = le_soil.fit_transform(df['soil_type'])

    # Save encoders
    os.makedirs('model', exist_ok=True)
    joblib.dump(le_crop, 'model/crop_encoder.pkl')
    joblib.dump(le_soil, 'model/soil_encoder.pkl')

    # Features and target
    features = [
        'crop_encoded', 'soil_encoded',
        'rainfall_mm', 'temperature_c',
        'fertilizer_kg', 'area_hectares'
    ]
    X = df[features]
    y = df['yield_tons']

    # Train model
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestRegressor(
        n_estimators=100, 
        random_state=42
    )
    model.fit(X_train, y_train)

    # Save model
    joblib.dump(model, 'model/crop_model.pkl')
    print(f"✅ Model trained!")

    return model, le_crop, le_soil


def predict_yield(
    crop_type, soil_type,
    rainfall_mm, temperature_c,
    fertilizer_kg, area_hectares
):
    # Load model and encoders
    model = joblib.load('model/crop_model.pkl')
    le_crop = joblib.load('model/crop_encoder.pkl')
    le_soil = joblib.load('model/soil_encoder.pkl')

    # Encode inputs
    crop_encoded = le_crop.transform([crop_type])[0]
    soil_encoded = le_soil.transform([soil_type])[0]

    # Predict
    features = np.array([[
        crop_encoded, soil_encoded,
        rainfall_mm, temperature_c,
        fertilizer_kg, area_hectares
    ]])

    prediction = model.predict(features)[0]
    return round(float(prediction), 2)


# Train model on startup if not exists
if not os.path.exists('model/crop_model.pkl'):
    train_model()