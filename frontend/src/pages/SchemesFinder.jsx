import React, { useState } from 'react';

function SchemesFinder() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      benefit: '6,000 per year',
      description: 'Direct income support of 6,000 per year to all landholding farmer families in three equal installments of 2,000 each.',
      eligibility: 'All landholding farmer families',
      category: 'Financial Aid',
      icon: '💰',
      color: '#16a34a',
      bg: '#dcfce7',
      link: 'https://pmkisan.gov.in',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Fasal Bima Yojana',
      fullName: 'Pradhan Mantri Fasal Bima Yojana',
      benefit: 'Crop insurance coverage',
      description: 'Provides financial support to farmers suffering crop loss or damage due to unforeseen events like natural calamities, pests and diseases.',
      eligibility: 'All farmers growing notified crops',
      category: 'Insurance',
      icon: '🛡️',
      color: '#2563eb',
      bg: '#dbeafe',
      link: 'https://pmfby.gov.in',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Kisan Credit Card',
      fullName: 'Kisan Credit Card Scheme',
      benefit: 'Credit up to 3 lakh at 4% interest',
      description: 'Provides farmers with affordable credit for agricultural needs including purchase of seeds, fertilizers and other farm inputs.',
      eligibility: 'All farmers, sharecroppers, tenant farmers',
      category: 'Credit',
      icon: '💳',
      color: '#7c3aed',
      bg: '#ede9fe',
      link: 'https://www.nabard.org',
      status: 'Active'
    },
    {
      id: 4,
      name: 'PMKSY',
      fullName: 'Pradhan Mantri Krishi Sinchai Yojana',
      benefit: 'Irrigation infrastructure support',
      description: 'Aims to provide end to end solutions in irrigation supply chain with focus on creating sources, distribution network and farm level application.',
      eligibility: 'Farmers with agricultural land',
      category: 'Irrigation',
      icon: '💧',
      color: '#0891b2',
      bg: '#cffafe',
      link: 'https://pmksy.gov.in',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Soil Health Card',
      fullName: 'Soil Health Card Scheme',
      benefit: 'Free soil testing and recommendations',
      description: 'Issues soil health cards to farmers with crop-wise recommendations of nutrients and fertilizers to improve productivity.',
      eligibility: 'All farmers',
      category: 'Advisory',
      icon: '🌱',
      color: '#d97706',
      bg: '#fef3c7',
      link: 'https://soilhealth.dac.gov.in',
      status: 'Active'
    },
    {
      id: 6,
      name: 'eNAM',
      fullName: 'National Agriculture Market',
      benefit: 'Better price discovery for produce',
      description: 'Online trading platform that networks existing APMC mandis to create a unified national market for agricultural commodities.',
      eligibility: 'All farmers with produce to sell',
      category: 'Market Access',
      icon: '🏪',
      color: '#dc2626',
      bg: '#fee2e2',
      link: 'https://enam.gov.in',
      status: 'Active'
    },
    {
      id: 7,
      name: 'PKVY',
      fullName: 'Paramparagat Krishi Vikas Yojana',
      benefit: '50,000 per hectare for 3 years',
      description: 'Promotes organic farming by providing financial assistance to farmers for adopting organic farming practices.',
      eligibility: 'Farmers willing to adopt organic farming',
      category: 'Financial Aid',
      icon: '🌿',
      color: '#16a34a',
      bg: '#dcfce7',
      link: 'https://pgsindia-ncof.gov.in',
      status: 'Active'
    },
    {
      id: 8,
      name: 'RKVY',
      fullName: 'Rashtriya Krishi Vikas Yojana',
      benefit: 'Infrastructure and technology support',
      description: 'Incentivizes states to increase public investment in agriculture and allied sectors with flexibility in planning and execution.',
      eligibility: 'Farmers through state government programs',
      category: 'Advisory',
      icon: '📋',
      color: '#d97706',
      bg: '#fef3c7',
      link: 'https://rkvy.nic.in',
      status: 'Active'
    }
  ];

  const categories = [
    'All', 'Financial Aid', 'Insurance',
    'Credit', 'Irrigation', 'Advisory', 'Market Access'
  ];

  const filteredSchemes = schemes.filter(s => {
    const matchesCategory =
      activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🏛️ Government Schemes</h1>
          <p style={styles.subtitle}>
            Discover schemes you are eligible for
          </p>
        </div>
        <div style={styles.statsBox}>
          <span style={styles.statsNum}>{schemes.length}</span>
          <span style={styles.statsLabel}>Active Schemes</span>
        </div>
      </div>

      <div style={styles.searchBar}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search schemes by name or benefit..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            style={styles.clearBtn}
            onClick={() => setSearch('')}
          >
            X
          </button>
        )}
      </div>

      <div style={styles.categoryRow}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              ...styles.categoryBtn,
              backgroundColor:
                activeCategory === cat ? '#16a34a' : 'white',
              color:
                activeCategory === cat ? 'white' : '#6b7280'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <p style={styles.resultsText}>
        Showing {filteredSchemes.length} scheme
        {filteredSchemes.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
        {search && ` for "${search}"`}
      </p>

      {filteredSchemes.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyIcon}>🔍</p>
          <p style={styles.emptyText}>
            No schemes found matching your search!
          </p>
          <button
            style={styles.resetBtn}
            onClick={() => {
              setSearch('');
              setActiveCategory('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={styles.schemesGrid}>
          {filteredSchemes.map(scheme => (
            <div key={scheme.id} style={styles.schemeCard}>

              <div style={styles.cardHeader}>
                <div style={{
                  ...styles.schemeIconBox,
                  backgroundColor: scheme.bg
                }}>
                  <span style={styles.schemeIcon}>
                    {scheme.icon}
                  </span>
                </div>
                <div style={styles.schemeTitle}>
                  <h3 style={styles.schemeName}>
                    {scheme.name}
                  </h3>
                  <p style={styles.schemeFullName}>
                    {scheme.fullName}
                  </p>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: '#dcfce7',
                  color: '#16a34a'
                }}>
                  Active
                </span>
              </div>

              <div style={{
                ...styles.benefitBox,
                backgroundColor: scheme.bg,
                borderLeft: `4px solid ${scheme.color}`
              }}>
                <span style={styles.benefitLabel}>
                  Benefit:
                </span>
                <span style={{
                  ...styles.benefitValue,
                  color: scheme.color
                }}>
                  {scheme.benefit}
                </span>
              </div>

              <p style={styles.description}>
                {scheme.description}
              </p>

              <div style={styles.eligibilityBox}>
                <span style={styles.eligibilityLabel}>
                  Eligibility:
                </span>
                <span style={styles.eligibilityText}>
                  {scheme.eligibility}
                </span>
              </div>

              <div style={styles.cardFooter}>
                <span style={{
                  ...styles.categoryTag,
                  backgroundColor: scheme.bg,
                  color: scheme.color
                }}>
                  {scheme.category}
                </span>
                
                  href={scheme.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...styles.applyBtn,
                    backgroundColor: scheme.color
                  }}
                >
                  Apply Now
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

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
  statsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    padding: '16px 24px',
    borderRadius: '12px',
  },
  statsNum: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#16a34a',
  },
  statsLabel: {
    fontSize: '0.8rem',
    color: '#16a34a',
    fontWeight: '600',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '12px 16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginBottom: '16px',
    gap: '10px',
  },
  searchIcon: {
    fontSize: '1.1rem',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '0.95rem',
    color: '#1a1a1a',
    backgroundColor: 'transparent',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
    fontSize: '0.9rem',
  },
  categoryRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  categoryBtn: {
    padding: '8px 16px',
    border: '1.5px solid #d1fae5',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  resultsText: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '16px',
  },
  schemesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  schemeCard: {
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  schemeIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  schemeIcon: {
    fontSize: '1.5rem',
  },
  schemeTitle: {
    flex: 1,
  },
  schemeName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '2px',
  },
  schemeFullName: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    flexShrink: 0,
  },
  benefitBox: {
    padding: '10px 14px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  benefitLabel: {
    fontSize: '0.85rem',
    color: '#374151',
    fontWeight: '600',
  },
  benefitValue: {
    fontSize: '0.9rem',
    fontWeight: '700',
  },
  description: {
    fontSize: '0.85rem',
    color: '#6b7280',
    lineHeight: '1.5',
  },
  eligibilityBox: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
  },
  eligibilityLabel: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#374151',
    flexShrink: 0,
  },
  eligibilityText: {
    fontSize: '0.82rem',
    color: '#6b7280',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
  },
  categoryTag: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  applyBtn: {
    padding: '8px 16px',
    color: 'white',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
    backgroundColor: 'white',
    borderRadius: '14px',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '12px',
  },
  emptyText: {
    color: '#6b7280',
    marginBottom: '16px',
  },
  resetBtn: {
    padding: '10px 20px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default SchemesFinder;