import React, { useState } from 'react';

function YieldPredictor() {
  const [formData, setFormData] = useState({
    crop_type: 'Rice',
    soil_type: 'Loamy',
    rainfall_mm: '',
    temperature_c: '',
    fertilizer_kg: '',
    area_hectares: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cropTypes = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'
  ];

  const soilTypes = [
    'Clay', 'Sandy', 'Loamy', 'Black'
  ];

  const cropInfo = {
    Rice: {
      icon: '🌾',
      idealRainfall: '1000-1500mm',
      idealTemp: '25-35C',
      season: 'Kharif'
    },
    Wheat: {
      icon: '🌿',
      idealRainfall: '400-500mm',
      idealTemp: '15-25C',
      season: 'Rabi'
    },
    Maize: {
      icon: '🌽',
      idealRainfall: '600-900mm',
      idealTemp: '20-30C',
      season: 'Kharif'
    },
    Cotton: {
      icon: '🤍',
      idealRainfall: '700-900mm',
      idealTemp: '25-35C',
      season: 'Kharif'
    },
    Sugarcane: {
      icon: '🎋',
      idealRainfall: '1200-1500mm',
      idealTemp: '25-35C',
      season: 'Annual'
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const predictYield = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulate ML prediction
      await new Promise(resolve => setTimeout(resolve, 1500));

      const rainfall = parseFloat(formData.rainfall_mm);
      const fertilizer = parseFloat(formData.fertilizer_kg);
      const area = parseFloat(formData.area_hectares);
      const temp = parseFloat(formData.temperature_c);

      // Simple prediction formula
      const baseYield =
        (rainfall * 0.003) +
        (fertilizer * 0.02) +
        (area * 0.5) +
        (temp * 0.05);

      const predictedYield = Math.min(
        Math.max(baseYield, 1), 15
      ).toFixed(2);

      const yieldPerHectare = (
        predictedYield / area
      ).toFixed(2);

      let recommendation = '';
      let recColor = '';

      if (predictedYield >= 8) {
        recommendation = 'Excellent yield expected! Maintain current farming practices and ensure timely harvesting.';
        recColor = '#16a34a';
      } else if (predictedYield >= 5) {
        recommendation = 'Good yield expected. Consider increasing fertilizer usage and improving irrigation for better results.';
        recColor = '#d97706';
      } else {
        recommendation = 'Low yield predicted. Improve irrigation, use quality seeds, and consider soil treatment before sowing.';
        recColor = '#dc2626';
      }

      setResult({
        predictedYield,
        yieldPerHectare,
        recommendation,
        recColor,
        cropType: formData.crop_type,
        area
      });

    } catch (err) {
      setError('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      crop_type: 'Rice',
      soil_type: 'Loamy',
      rainfall_mm: '',
      temperature_c: '',
      fertilizer_kg: '',
      area_hectares: ''
    });
    setResult(null);
    setError('');
  };

  const selectedCrop = cropInfo[formData.crop_type];

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            🌱 Crop Yield Predictor
          </h1>
          <p style={styles.subtitle}>
            AI-powered yield prediction for your crops
          </p>
        </div>
        <div style={styles.mlBadge}>
          <span style={styles.mlDot} />
          ML Model Active
        </div>
      </div>

      <div style={styles.mainGrid}>

        {/* Left - Form */}
        <div style={styles.formSection}>

          {/* Crop Info Card */}
          <div style={styles.cropInfoCard}>
            <span style={styles.cropInfoIcon}>
              {selectedCrop.icon}
            </span>
            <div>
              <p style={styles.cropInfoName}>
                {formData.crop_type}
              </p>
              <p style={styles.cropInfoDetail}>
                Season: {selectedCrop.season} |
                Rainfall: {selectedCrop.idealRainfall} |
                Temp: {selectedCrop.idealTemp}
              </p>
            </div>
          </div>

          <form onSubmit={predictYield}>

            {/* Crop and Soil */}
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Crop Type *
                </label>
                <select
                  style={styles.input}
                  name="crop_type"
                  value={formData.crop_type}
                  onChange={handleChange}
                  required
                >
                  {cropTypes.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Soil Type *
                </label>
                <select
                  style={styles.input}
                  name="soil_type"
                  value={formData.soil_type}
                  onChange={handleChange}
                  required
                >
                  {soilTypes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rainfall and Temp */}
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Rainfall (mm) *
                </label>
                <input
                  style={styles.input}
                  type="number"
                  name="rainfall_mm"
                  placeholder={`Ideal: ${selectedCrop.idealRainfall}`}
                  value={formData.rainfall_mm}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Temperature (C) *
                </label>
                <input
                  style={styles.input}
                  type="number"
                  name="temperature_c"
                  placeholder={`Ideal: ${selectedCrop.idealTemp}`}
                  value={formData.temperature_c}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Fertilizer and Area */}
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Fertilizer (kg/hectare) *
                </label>
                <input
                  style={styles.input}
                  type="number"
                  name="fertilizer_kg"
                  placeholder="e.g. 150"
                  value={formData.fertilizer_kg}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Land Area (hectares) *
                </label>
                <input
                  style={styles.input}
                  type="number"
                  name="area_hectares"
                  placeholder="e.g. 2.5"
                  value={formData.area_hectares}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && (
              <div style={styles.errorBox}>{error}</div>
            )}

            <div style={styles.btnRow}>
              <button
                type="submit"
                style={{
                  ...styles.predictBtn,
                  opacity: loading ? 0.7 : 1
                }}
                disabled={loading}
              >
                {loading
                  ? '🔄 Predicting...'
                  : '🌱 Predict Yield'}
              </button>
              <button
                type="button"
                style={styles.resetBtn}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

          </form>
        </div>

        {/* Right - Results */}
        <div style={styles.resultsSection}>

          {!result && !loading && (
            <div style={styles.emptyResult}>
              <p style={styles.emptyIcon}>🌾</p>
              <p style={styles.emptyTitle}>
                Ready to Predict!
              </p>
              <p style={styles.emptyText}>
                Fill in your crop details on the left
                and click Predict Yield to get
                AI-powered results.
              </p>
            </div>
          )}

          {loading && (
            <div style={styles.loadingBox}>
              <div style={styles.loadingSpinner} />
              <p style={styles.loadingText}>
                Analyzing crop data...
              </p>
              <p style={styles.loadingSubtext}>
                Our ML model is processing your inputs
              </p>
            </div>
          )}

          {result && !loading && (
            <div style={styles.resultCard}>

              <h3 style={styles.resultTitle}>
                Prediction Results
              </h3>

              {/* Main Result */}
              <div style={styles.mainResult}>
                <p style={styles.resultCrop}>
                  {cropInfo[result.cropType].icon}
                  {result.cropType}
                </p>
                <p style={styles.yieldValue}>
                  {result.predictedYield}
                  <span style={styles.yieldUnit}>
                    tons
                  </span>
                </p>
                <p style={styles.yieldLabel}>
                  Total Expected Yield
                </p>
              </div>

              {/* Stats Row */}
              <div style={styles.statsRow}>
                <div style={styles.statBox}>
                  <p style={styles.statValue}>
                    {result.yieldPerHectare}
                  </p>
                  <p style={styles.statLabel}>
                    Tons/Hectare
                  </p>
                </div>
                <div style={styles.statDivider} />
                <div style={styles.statBox}>
                  <p style={styles.statValue}>
                    {result.area}
                  </p>
                  <p style={styles.statLabel}>
                    Hectares
                  </p>
                </div>
                <div style={styles.statDivider} />
                <div style={styles.statBox}>
                  <p style={styles.statValue}>
                    {result.predictedYield >= 8
                      ? 'High'
                      : result.predictedYield >= 5
                      ? 'Medium'
                      : 'Low'}
                  </p>
                  <p style={styles.statLabel}>
                    Yield Grade
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div style={{
                ...styles.recommendationBox,
                borderLeft:
                  `4px solid ${result.recColor}`,
                backgroundColor:
                  result.recColor + '15'
              }}>
                <p style={styles.recTitle}>
                  Recommendation
                </p>
                <p style={{
                  ...styles.recText,
                  color: result.recColor
                }}>
                  {result.recommendation}
                </p>
              </div>

              {/* Tips */}
              <div style={styles.tipsBox}>
                <p style={styles.tipsTitle}>
                  Farming Tips for {result.cropType}
                </p>
                {[
                  'Use certified seeds for better yield',
                  'Monitor soil moisture regularly',
                  'Apply fertilizer at right growth stage',
                  'Check for pests and diseases weekly'
                ].map((tip, i) => (
                  <div key={i} style={styles.tipItem}>
                    <span style={styles.tipDot}>•</span>
                    <span style={styles.tipText}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1100px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '0.95rem',
  },
  mlBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    padding: '10px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  mlDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#16a34a',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'pulse 1.5s infinite',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
  },
  cropInfoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#f0fdf4',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid #dcfce7',
  },
  cropInfoIcon: {
    fontSize: '2rem',
  },
  cropInfoName: {
    fontWeight: '700',
    color: '#1a1a1a',
    fontSize: '0.95rem',
    marginBottom: '2px',
  },
  cropInfoDetail: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '4px',
  },
  inputGroup: {
    marginBottom: '14px',
  },
  label: {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #d1fae5',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#f9fafb',
    boxSizing: 'border-box',
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '12px',
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  predictBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  resetBtn: {
    padding: '12px 20px',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  resultsSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  emptyResult: {
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '48px 24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    maxWidth: '260px',
  },
  loadingBox: {
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '48px 24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #dcfce7',
    borderTop: '4px solid #16a34a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  loadingSubtext: {
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  resultTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  mainResult: {
    backgroundColor: '#f0fdf4',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    border: '2px solid #dcfce7',
  },
  resultCrop: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  yieldValue: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#16a34a',
    lineHeight: 1,
    marginBottom: '4px',
  },
  yieldUnit: {
    fontSize: '1.2rem',
    fontWeight: '500',
    marginLeft: '4px',
  },
  yieldLabel: {
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    padding: '16px',
  },
  statBox: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    backgroundColor: '#e5e7eb',
  },
  recommendationBox: {
    padding: '14px 16px',
    borderRadius: '8px',
  },
  recTitle: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '6px',
  },
  recText: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    fontWeight: '500',
  },
  tipsBox: {
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    padding: '16px',
  },
  tipsTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '10px',
  },
  tipItem: {
    display: 'flex',
    gap: '8px',
    marginBottom: '6px',
  },
  tipDot: {
    color: '#16a34a',
    fontWeight: '700',
    flexShrink: 0,
  },
  tipText: {
    fontSize: '0.82rem',
    color: '#6b7280',
  },
};

export default YieldPredictor;