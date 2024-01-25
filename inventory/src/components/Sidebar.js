import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }} className='sidebar'>
      <CDBSidebar textColor="#fff" backgroundColor="#355">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            GHAA Inventory
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Manage Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/location" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="city">Locations</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/unit" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Inventory Unit</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/custodian"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Custodian</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/supplier"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="car">Supplier</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/receiver"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Receiver</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/supply"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Supply</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
           
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      
    </div>
  );
};

export default Sidebar;