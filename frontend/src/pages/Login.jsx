import React, { useState } from 'react';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    landArea: '',
    cropType: 'Rice'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Bihar', 'Chhattisgarh',
    'Gujarat', 'Haryana', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Odisha',
    'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const cropTypes = [
    'Rice', 'Wheat', 'Maize',
    'Cotton', 'Sugarcane'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes - bypass actual API
      if (formData.email && formData.password) {
        onLogin({
          name: formData.name || 'Farmer',
          email: formData.email
        });
      } else {
        setError('Please fill all required fields!');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <h1 style={styles.brandName}>🌾 FarmAid</h1>
          <p style={styles.brandTagline}>
            Empowering Farmers Across India
          </p>
          <div style={styles.features}>
            {[
              '📊 Track crop expenses & income',
              '🌱 Predict crop yield with AI',
              '🏛️ Discover government schemes',
              '🏦 Check loan eligibility',
            ].map((f, i) => (
              <div key={i} style={styles.featureItem}>
                {f}
              </div>
            ))}
          </div>
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <span style={styles.statNum}>600M+</span>
              <span style={styles.statLabel}>Farmers</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNum}>28</span>
              <span style={styles.statLabel}>States</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNum}>6+</span>
              <span style={styles.statLabel}>Schemes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>
            {isRegister ? '👨‍🌾 Create Account' : '👋 Welcome Back'}
          </h2>
          <p style={styles.formSubtitle}>
            {isRegister
              ? 'Join thousands of farmers today'
              : 'Sign in to your FarmAid account'}
          </p>

          {error && (
            <div style={styles.errorBox}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address *</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password *</label>
              <input
                style={styles.input}
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {isRegister && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    style={styles.input}
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.row}>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.label}>State *</label>
                    <select
                      style={styles.input}
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      {indianStates.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.label}>Crop Type</label>
                    <select
                      style={styles.input}
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleChange}
                    >
                      {cropTypes.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Land Area (hectares)
                  </label>
                  <input
                    style={styles.input}
                    type="number"
                    name="landArea"
                    placeholder="e.g. 2.5"
                    value={formData.landArea}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1
              }}
              disabled={loading}
            >
              {loading
                ? '⏳ Please wait...'
                : isRegister
                ? '🌾 Create Account'
                : '🚀 Sign In'}
            </button>
          </form>

          <p style={styles.switchText}>
            {isRegister
              ? 'Already have an account? '
              : "Don't have an account? "}
            <span
              style={styles.switchLink}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Sign In' : 'Register'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #16a34a, #15803d)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
  },
  leftContent: {
    color: 'white',
    maxWidth: '400px',
  },
  brandName: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '8px',
  },
  brandTagline: {
    fontSize: '1.1rem',
    color: '#bbf7d0',
    marginBottom: '40px',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '40px',
  },
  featureItem: {
    fontSize: '1rem',
    color: '#dcfce7',
    padding: '12px 16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
  },
  statsRow: {
    display: 'flex',
    gap: '24px',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNum: {
    fontSize: '1.8rem',
    fontWeight: '700',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#bbf7d0',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    padding: '48px',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  formTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  formSubtitle: {
    color: '#6b7280',
    marginBottom: '24px',
    fontSize: '0.95rem',
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '0.9rem',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #d1fae5',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    backgroundColor: '#f9fafb',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    marginBottom: '16px',
  },
  switchText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.9rem',
  },
  switchLink: {
    color: '#16a34a',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Login;