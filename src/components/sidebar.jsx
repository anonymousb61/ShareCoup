import React from 'react';

const Sidebar = ({ navigateToPage, currentPage }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className={currentPage === 'home' ? 'active' : ''}>
          <button onClick={() => navigateToPage('home')}>Home</button>
        </li>
        <li className={currentPage === 'profile' ? 'active' : ''}>
          <button onClick={() => navigateToPage('profile')}>Profile</button>
        </li>
        <li className={currentPage === 'dashboard' ? 'active' : ''}>
          <button onClick={() => navigateToPage('dashboard')}>Coupons</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
