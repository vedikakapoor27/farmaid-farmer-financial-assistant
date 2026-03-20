import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/',         icon: '📊', label: 'Dashboard'       },
  { path: '/expenses', icon: '💰', label: 'Expense Tracker' },
  { path: '/yield',    icon: '🌱', label: 'Yield Predictor' },
  { path: '/schemes',  icon: '🏛️', label: 'Govt Schemes'    },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div style={styles.sidebar}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            ...styles.navItem,
            ...(location.pathname === item.path ? styles.active : {}),
          }}
        >
          <span style={styles.icon}>{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: '220px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #dcfce7',
    padding: '24px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minHeight: 'calc(100vh - 64px)',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#374151',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  active: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    fontWeight: '600',
  },
  icon: {
    fontSize: '1.1rem',
  }
};

export default Sidebar;