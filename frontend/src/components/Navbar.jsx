import React from 'react';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        🌾 FarmAid
      </div>
      <div style={styles.tagline}>
        Empowering Farmers Across India
      </div>
      <div style={styles.profile}>
        👨‍🌾 Farmer Dashboard
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#16a34a',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  tagline: {
    color: '#bbf7d0',
    fontSize: '0.85rem',
  },
  profile: {
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500',
  }
};

export default Navbar;