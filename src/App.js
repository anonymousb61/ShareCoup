import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import HomePage from './components/homepage';
import ProfilePage from './components/profile';
import Dashboard from './components/dashboard';
import ProfilePrivateRoute from './components/ProfilePrivateRoute';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <HomePage />;
    }
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <nav>
        <button className="homepage-button" onClick={() => navigateToPage('home')}>
          Home
        </button>
        <button className="profilepage-button" onClick={() => navigateToPage('profile')}>
          My Profile
        </button>
        <button className="dashboard-button" onClick={() => navigateToPage('dashboard')}>
          Coupons
        </button>
      </nav>
      {renderPage()}
    </div>
  );
};

export default App;
