import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ExpenseTracker from './pages/ExpenseTracker';
import YieldPredictor from './pages/YieldPredictor';
import SchemesFinder from './pages/SchemesFinder';
import Login from './pages/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpenseTracker />} />
              <Route path="/yield" element={<YieldPredictor />} />
              <Route path="/schemes" element={<SchemesFinder />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;