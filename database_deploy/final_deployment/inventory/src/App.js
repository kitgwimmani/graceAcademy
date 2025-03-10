import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Sidebar from './components/Sidebar';

import User from './User';
import CreateUser from './user/CreateUser';
import UpdateUser from './user/UpdateUser';

import Category from './Category';
import CreateCategory from './category/CreateCategory';
import UpdateCategory from './category/UpdateCategory';

import Custodian from './Custodian';
import CreateCustodian from './custodian/CreateCustodian';
import UpdateCustodian from './custodian/UpdateCustodian';

import Location from './Location';
import CreateLocation from './location/CreateLocation';
import UpdateLocation from './location/UpdateLocation';

import Unit from './Unit';
import CreateUnit from './unit/CreateUnit';
import UpdateUnit from './unit/UpdateUnit';

import Product from './Product';
import CreateProduct from './product/CreateProduct';
import UpdateProduct from './product/UpdateProduct';

import Supplier from './Supplier';
import CreateSupplier from './supplier/CreateSupplier';
import UpdateSupplier from './supplier/UpdateSupplier';

import Receiver from './Receiver';
import CreateReceiver from './receiver/CreateReceiver';
import UpdateReceiver from './receiver/UpdateReceiver';

import Supply from './Supply';
import CreateSupply from './supply/CreateSupply';
import UpdateSupply from './supply/UpdateSupply';
import ManageSupply from './supply/ManageSupply';

import Dashboard from './Dashboard';

import Inventory from './report/Inventory';
import Expiration from './report/Expiration';
import Threshold from './report/Threshold';
import Notifications from './Notifications';
import PostDate from './report/PostDate';
import SupplyReport from './report/SupplyReport';
import LocationReport from './report/LocationReport';
import CustodianReport from './report/CustodianReport';
import ReorderReport from './report/ReorderReport';
import InventoryReport from './report/InventoryReport';
import DamageReport from './report/DamageReport';

import Login from './Login';

import Damage from './Damage';
import Exit from './Exit';

function App() {
  // Maintain global session state
  const [isSidebarActive, setSidebarActive] = useState(false);

  // Check session on app load
  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      setSidebarActive(true); // Activate sidebar if session exists
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Clear user session
    setSidebarActive(false); // Deactivate sidebar
    console.log('User logged out');
    window.location.href = '/'; // Redirect to login
  };

  return (
    <div className="app-container">
      <BrowserRouter>
        {/* Render Sidebar only if session is active */}
        {isSidebarActive && (
          <div className="sidebar" id="non-printable-content">
            <Sidebar isActive={isSidebarActive} handleLogout={handleLogout} />
          </div>
        )}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login setSidebarActive={setSidebarActive} />} />

            <Route path="/user" element={<User setSidebarActive={setSidebarActive} />} />
            <Route path="user/createUser" element={<CreateUser setSidebarActive={setSidebarActive} />} />
            <Route path="user/updateUser/:id" element={<UpdateUser setSidebarActive={setSidebarActive} />} />

            <Route path="/category" element={<Category setSidebarActive={setSidebarActive} />} />
            <Route path="category/createCategory" element={<CreateCategory setSidebarActive={setSidebarActive} />} />
            <Route path="category/updateCategory/:id" element={<UpdateCategory setSidebarActive={setSidebarActive} />} />

            <Route path="/custodian" element={<Custodian setSidebarActive={setSidebarActive} />} />
            <Route path="custodian/createCustodian" element={<CreateCustodian setSidebarActive={setSidebarActive} />} />
            <Route path="custodian/updateCustodian/:id" element={<UpdateCustodian setSidebarActive={setSidebarActive} />} />

            <Route path="/location" element={<Location setSidebarActive={setSidebarActive} />} />
            <Route path="location/createLocation" element={<CreateLocation setSidebarActive={setSidebarActive} />} />
            <Route path="location/updateLocation/:id" element={<UpdateLocation setSidebarActive={setSidebarActive} />} />

            <Route path="/unit" element={<Unit setSidebarActive={setSidebarActive} />} />
            <Route path="unit/createUnit" element={<CreateUnit setSidebarActive={setSidebarActive} />} />
            <Route path="unit/updateUnit/:id" element={<UpdateUnit setSidebarActive={setSidebarActive} />} />

            <Route path="/product" element={<Product setSidebarActive={setSidebarActive} />} />
            <Route path="product/createProduct" element={<CreateProduct setSidebarActive={setSidebarActive} />} />
            <Route path="product/updateProduct/:id" element={<UpdateProduct setSidebarActive={setSidebarActive} />} />

            <Route path="/supplier" element={<Supplier setSidebarActive={setSidebarActive} />} />
            <Route path="supplier/createSupplier" element={<CreateSupplier setSidebarActive={setSidebarActive} />} />
            <Route path="supplier/updateSupplier/:id" element={<UpdateSupplier setSidebarActive={setSidebarActive} />} />

            <Route path="/receiver" element={<Receiver setSidebarActive={setSidebarActive} />} />
            <Route path="receiver/createReceiver" element={<CreateReceiver setSidebarActive={setSidebarActive} />} />
            <Route path="receiver/updateReceiver/:id" element={<UpdateReceiver setSidebarActive={setSidebarActive} />} />

            <Route path="/supply" element={<Supply setSidebarActive={setSidebarActive} />} />
            <Route path="supply/createSupply/:id" element={<CreateSupply setSidebarActive={setSidebarActive} />} />
            <Route path="supply/updateSupply/:id" element={<UpdateSupply setSidebarActive={setSidebarActive} />} />
            <Route path="supply/manageSupply/:id" element={<ManageSupply setSidebarActive={setSidebarActive} />} />

            <Route path="/dashboard" element={<Dashboard setSidebarActive={setSidebarActive} />} />

            <Route path="/inventory" element={<Inventory setSidebarActive={setSidebarActive} />} />
            <Route path="/threshold" element={<Threshold setSidebarActive={setSidebarActive} />} />
            <Route path="/expiration" element={<Expiration setSidebarActive={setSidebarActive} />} />
            <Route path="/post_date" element={<PostDate setSidebarActive={setSidebarActive} />} />
            <Route path="/notifications" element={<Notifications setSidebarActive={setSidebarActive} />} />
            <Route path="/supply_report" element={<SupplyReport setSidebarActive={setSidebarActive} />} />
            <Route path="/location_report" element={<LocationReport setSidebarActive={setSidebarActive} />} />
            <Route path="/custodian_report" element={<CustodianReport setSidebarActive={setSidebarActive} />} />
            <Route path="/reorder_report" element={<ReorderReport setSidebarActive={setSidebarActive} />} />
            <Route path="/inventory_report" element={<InventoryReport setSidebarActive={setSidebarActive} />} />
            <Route path="/damage_report" element={<DamageReport setSidebarActive={setSidebarActive} />} />


            <Route path="/damage" element={<Damage setSidebarActive={setSidebarActive} />} />
            <Route path="/damage/:id" element={<Damage setSidebarActive={setSidebarActive} />} />

            <Route path="/exit/:id" element={<Exit setSidebarActive={setSidebarActive} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
