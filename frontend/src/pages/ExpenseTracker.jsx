import React, { useState } from 'react';

function ExpenseTracker() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'income',
      category: 'Crop Sale',
      description: 'Rice harvest sale',
      amount: 45000,
      date: '2026-04-28',
      cropName: 'Rice'
    },
    {
      id: 2,
      type: 'expense',
      category: 'Fertilizer',
      description: 'Urea fertilizer purchase',
      amount: 8500,
      date: '2026-04-25',
      cropName: 'Wheat'
    },
    {
      id: 3,
      type: 'income',
      category: 'Government Aid',
      description: 'PM-KISAN installment',
      amount: 2000,
      date: '2026-04-20',
      cropName: ''
    },
    {
      id: 4,
      type: 'expense',
      category: 'Labor',
      description: 'Farm workers payment',
      amount: 12000,
      date: '2026-04-18',
      cropName: 'Rice'
    },
    {
      id: 5,
      type: 'expense',
      category: 'Seeds',
      description: 'Wheat seeds purchase',
      amount: 5200,
      date: '2026-04-15',
      cropName: 'Wheat'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    type: 'expense',
    category: 'Seeds',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    cropName: ''
  });

  const incomeCategories = [
    'Crop Sale', 'Government Aid',
    'Subsidy', 'Other Income'
  ];

  const expenseCategories = [
    'Seeds', 'Fertilizer', 'Irrigation',
    'Labor', 'Equipment', 'Other'
  ];

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      ...formData,
      amount: parseFloat(formData.amount)
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({
      type: 'expense',
      category: 'Seeds',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      cropName: ''
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>💰 Expense Tracker</h1>
          <p style={styles.subtitle}>
            Track your farm income and expenses
          </p>
        </div>
        <button
          style={styles.addBtn}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Entry'}
        </button>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div style={{
          ...styles.summaryCard,
          borderLeft: '4px solid #16a34a'
        }}>
          <p style={styles.summaryLabel}>Total Income</p>
          <p style={{
            ...styles.summaryValue,
            color: '#16a34a'
          }}>
            ₹{totalIncome.toLocaleString()}
          </p>
        </div>
        <div style={{
          ...styles.summaryCard,
          borderLeft: '4px solid #dc2626'
        }}>
          <p style={styles.summaryLabel}>Total Expenses</p>
          <p style={{
            ...styles.summaryValue,
            color: '#dc2626'
          }}>
            ₹{totalExpense.toLocaleString()}
          </p>
        </div>
        <div style={{
          ...styles.summaryCard,
          borderLeft: '4px solid #2563eb'
        }}>
          <p style={styles.summaryLabel}>Net Balance</p>
          <p style={{
            ...styles.summaryValue,
            color: netBalance >= 0 ? '#16a34a' : '#dc2626'
          }}>
            ₹{netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>➕ Add New Entry</h3>
          <form onSubmit={handleSubmit}>
            {/* Type Toggle */}
            <div style={styles.typeToggle}>
              {['income', 'expense'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    type,
                    category: type === 'income'
                      ? 'Crop Sale' : 'Seeds'
                  })}
                  style={{
                    ...styles.typeBtn,
                    backgroundColor:
                      formData.type === type
                        ? (type === 'income'
                          ? '#16a34a' : '#dc2626')
                        : '#f3f4f6',
                    color:
                      formData.type === type
                        ? 'white' : '#6b7280'
                  }}
                >
                  {type === 'income'
                    ? '📈 Income' : '📉 Expense'}
                </button>
              ))}
            </div>

            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Category *</label>
                <select
                  style={styles.input}
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {(formData.type === 'income'
                    ? incomeCategories
                    : expenseCategories
                  ).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Amount (₹) *</label>
                <input
                  style={styles.input}
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Date *</label>
                <input
                  style={styles.input}
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Crop Name</label>
                <input
                  style={styles.input}
                  type="text"
                  name="cropName"
                  placeholder="e.g. Rice, Wheat"
                  value={formData.cropName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description *</label>
              <input
                style={styles.input}
                type="text"
                name="description"
                placeholder="Brief description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              ✅ Save Entry
            </button>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={styles.filterRow}>
        {['all', 'income', 'expense'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              backgroundColor:
                filter === f ? '#16a34a' : 'white',
              color: filter === f ? 'white' : '#6b7280'
            }}
          >
            {f === 'all' ? '📋 All'
              : f === 'income' ? '📈 Income'
              : '📉 Expenses'}
          </button>
        ))}
        <span style={styles.filterCount}>
          {filteredTransactions.length} entries
        </span>
      </div>

      {/* Transactions List */}
      <div style={styles.transactionsList}>
        {filteredTransactions.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No entries found! Add your first entry above.</p>
          </div>
        ) : (
          filteredTransactions.map(t => (
            <div key={t.id} style={styles.transactionCard}>
              <div style={{
                ...styles.transactionIndicator,
                backgroundColor:
                  t.type === 'income' ? '#16a34a' : '#dc2626'
              }} />
              <div style={styles.transactionInfo}>
                <div style={styles.transactionTop}>
                  <div>
                    <p style={styles.transactionDesc}>
                      {t.description}
                    </p>
                    <p style={styles.transactionMeta}>
                      {t.category}
                      {t.cropName && ` • ${t.cropName}`}
                      {` • ${t.date}`}
                    </p>
                  </div>
                  <div style={styles.transactionRight}>
                    <p style={{
                      ...styles.transactionAmount,
                      color: t.type === 'income'
                        ? '#16a34a' : '#dc2626'
                    }}>
                      {t.type === 'income' ? '+' : '-'}
                      ₹{t.amount.toLocaleString()}
                    </p>
                    <span style={{
                      ...styles.typeBadge,
                      backgroundColor:
                        t.type === 'income'
                          ? '#dcfce7' : '#fee2e2',
                      color:
                        t.type === 'income'
                          ? '#16a34a' : '#dc2626'
                    }}>
                      {t.type}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                style={styles.deleteBtn}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1000px',
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
  addBtn: {
    padding: '10px 20px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  summaryLabel: {
    fontSize: '0.85rem',
    color: '#6b7280',
    marginBottom: '8px',
  },
  summaryValue: {
    fontSize: '1.6rem',
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginBottom: '24px',
  },
  formTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#1a1a1a',
  },
  typeToggle: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  typeBtn: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  },
  inputGroup: {
    marginBottom: '12px',
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
  submitBtn: {
    padding: '12px 24px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  filterRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  filterBtn: {
    padding: '8px 16px',
    border: '1.5px solid #d1fae5',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  filterCount: {
    marginLeft: 'auto',
    color: '#6b7280',
    fontSize: '0.85rem',
  },
  transactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  transactionCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    gap: '12px',
  },
  transactionIndicator: {
    width: '4px',
    height: '48px',
    borderRadius: '2px',
    flexShrink: 0,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDesc: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  transactionMeta: {
    fontSize: '0.8rem',
    color: '#9ca3af',
  },
  transactionRight: {
    textAlign: 'right',
  },
  transactionAmount: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '4px',
  },
  typeBadge: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '0.72rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '4px',
    opacity: 0.6,
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px',
    color: '#9ca3af',
    backgroundColor: 'white',
    borderRadius: '12px',
  },
};

export default ExpenseTracker;