import React, { useState } from 'react';

function Dashboard() {
  const [farmerName] = useState('Vedika');

  const stats = [
    {
      icon: '💰',
      label: 'Total Income',
      value: '₹1,24,500',
      change: '+12% this month',
      color: '#16a34a',
      bg: '#dcfce7'
    },
    {
      icon: '📉',
      label: 'Total Expenses',
      value: '₹48,200',
      change: '-5% this month',
      color: '#dc2626',
      bg: '#fee2e2'
    },
    {
      icon: '🏦',
      label: 'Net Balance',
      value: '₹76,300',
      change: '+8% this month',
      color: '#2563eb',
      bg: '#dbeafe'
    },
    {
      icon: '🌱',
      label: 'Active Crops',
      value: '3 Crops',
      change: 'Rice, Wheat, Maize',
      color: '#d97706',
      bg: '#fef3c7'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      category: 'Crop Sale',
      description: 'Rice harvest sale',
      amount: 45000,
      date: '28 Apr 2026'
    },
    {
      id: 2,
      type: 'expense',
      category: 'Fertilizer',
      description: 'Urea fertilizer purchase',
      amount: 8500,
      date: '25 Apr 2026'
    },
    {
      id: 3,
      type: 'income',
      category: 'Government Aid',
      description: 'PM-KISAN installment',
      amount: 2000,
      date: '20 Apr 2026'
    },
    {
      id: 4,
      type: 'expense',
      category: 'Labor',
      description: 'Farm workers payment',
      amount: 12000,
      date: '18 Apr 2026'
    },
    {
      id: 5,
      type: 'expense',
      category: 'Seeds',
      description: 'Wheat seeds purchase',
      amount: 5200,
      date: '15 Apr 2026'
    }
  ];

  const cropStatus = [
    {
      name: 'Rice',
      stage: 'Harvesting',
      progress: 90,
      area: '2 hectares',
      expectedYield: '8.5 tons',
      color: '#16a34a'
    },
    {
      name: 'Wheat',
      stage: 'Growing',
      progress: 55,
      area: '1.5 hectares',
      expectedYield: '5.8 tons',
      color: '#d97706'
    },
    {
      name: 'Maize',
      stage: 'Sowing',
      progress: 20,
      area: '1 hectare',
      expectedYield: '6.2 tons',
      color: '#2563eb'
    }
  ];

  const schemes = [
    {
      name: 'PM-KISAN',
      status: 'Active',
      benefit: '₹2,000 received',
      color: '#16a34a'
    },
    {
      name: 'Fasal Bima',
      status: 'Enrolled',
      benefit: 'Crop insured',
      color: '#2563eb'
    },
    {
      name: 'Kisan Credit',
      status: 'Eligible',
      benefit: 'Up to ₹3 lakh',
      color: '#d97706'
    }
  ];

  return (
    <div style={styles.container}>

      {/* Welcome Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.welcomeText}>
            👋 Welcome back, {farmerName}!
          </h1>
          <p style={styles.dateText}>
            📅 {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div style={styles.weatherCard}>
          <span style={styles.weatherIcon}>🌤️</span>
          <div>
            <p style={styles.weatherTemp}>32°C</p>
            <p style={styles.weatherDesc}>
              Good day for farming!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <div style={{
              ...styles.statIcon,
              backgroundColor: stat.bg
            }}>
              {stat.icon}
            </div>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>{stat.label}</p>
              <p style={{
                ...styles.statValue,
                color: stat.color
              }}>
                {stat.value}
              </p>
              <p style={styles.statChange}>{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row */}
      <div style={styles.middleRow}>

        {/* Recent Transactions */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            💳 Recent Transactions
          </h3>
          {recentTransactions.map((t) => (
            <div key={t.id} style={styles.transactionItem}>
              <div style={styles.transactionLeft}>
                <span style={{
                  ...styles.transactionDot,
                  backgroundColor: t.type === 'income'
                    ? '#16a34a' : '#dc2626'
                }} />
                <div>
                  <p style={styles.transactionDesc}>
                    {t.description}
                  </p>
                  <p style={styles.transactionMeta}>
                    {t.category} • {t.date}
                  </p>
                </div>
              </div>
              <span style={{
                ...styles.transactionAmount,
                color: t.type === 'income'
                  ? '#16a34a' : '#dc2626'
              }}>
                {t.type === 'income' ? '+' : '-'}
                ₹{t.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Crop Status */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🌾 Crop Status</h3>
          {cropStatus.map((crop, i) => (
            <div key={i} style={styles.cropItem}>
              <div style={styles.cropHeader}>
                <div>
                  <p style={styles.cropName}>{crop.name}</p>
                  <p style={styles.cropMeta}>
                    {crop.area} • Expected: {crop.expectedYield}
                  </p>
                </div>
                <span style={{
                  ...styles.cropBadge,
                  backgroundColor: crop.color + '20',
                  color: crop.color
                }}>
                  {crop.stage}
                </span>
              </div>
              <div style={styles.progressBar}>
                <div style={{
                  ...styles.progressFill,
                  width: `${crop.progress}%`,
                  backgroundColor: crop.color
                }} />
              </div>
              <p style={styles.progressText}>
                {crop.progress}% complete
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div style={styles.bottomRow}>

        {/* Schemes */}
        <div style={styles.schemesCard}>
          <h3 style={styles.cardTitle}>
            🏛️ Active Government Schemes
          </h3>
          <div style={styles.schemesGrid}>
            {schemes.map((s, i) => (
              <div key={i} style={styles.schemeItem}>
                <div style={{
                  ...styles.schemeDot,
                  backgroundColor: s.color
                }} />
                <div>
                  <p style={styles.schemeName}>{s.name}</p>
                  <p style={styles.schemeBenefit}>
                    {s.benefit}
                  </p>
                </div>
                <span style={{
                  ...styles.schemeStatus,
                  color: s.color,
                  backgroundColor: s.color + '20'
                }}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.quickCard}>
          <h3 style={styles.cardTitle}>⚡ Quick Actions</h3>
          <div style={styles.actionsGrid}>
            {[
              { icon: '💰', label: 'Add Expense' },
              { icon: '🌱', label: 'Predict Yield' },
              { icon: '🏛️', label: 'View Schemes' },
              { icon: '🏦', label: 'Check Loan' },
            ].map((action, i) => (
              <button key={i} style={styles.actionBtn}>
                <span style={styles.actionIcon}>
                  {action.icon}
                </span>
                <span style={styles.actionLabel}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  welcomeText: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  dateText: {
    color: '#6b7280',
    fontSize: '0.95rem',
  },
  weatherCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  weatherIcon: {
    fontSize: '2.5rem',
  },
  weatherTemp: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  weatherDesc: {
    color: '#6b7280',
    fontSize: '0.85rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  statIcon: {
    fontSize: '1.8rem',
    padding: '12px',
    borderRadius: '10px',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '2px',
  },
  statChange: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  middleRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  transactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  transactionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  transactionDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  transactionDesc: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  transactionMeta: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  transactionAmount: {
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  cropItem: {
    marginBottom: '16px',
  },
  cropHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  cropName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cropMeta: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  cropBadge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#f3f4f6',
    borderRadius: '3px',
    marginBottom: '4px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  bottomRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '16px',
  },
  schemesCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  schemesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  schemeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  schemeDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  schemeName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  schemeBenefit: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  schemeStatus: {
    marginLeft: 'auto',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  quickCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  actionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 8px',
    backgroundColor: '#f0fdf4',
    border: '1.5px solid #dcfce7',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  actionIcon: {
    fontSize: '1.5rem',
  },
  actionLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#16a34a',
    textAlign: 'center',
  },
};

export default Dashboard;