import React from 'react';
import './DarkSidebar.css';

const DarkSidebar = () => {
  return (
    <div className="dark-sidebar">
      {/* Your sidebar content goes here */}
      <h1>Inventory</h1>
      <ul>
        <li>Accounts</li>
        <li>Categories</li>
        <li>Custodians</li>
        <li>Locations</li>
        <li>Item Units</li>
        <li>Inventory</li>
      </ul>
    </div>
  );
};

export default DarkSidebar;