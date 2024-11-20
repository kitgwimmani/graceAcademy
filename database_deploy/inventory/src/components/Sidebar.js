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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const SidebarMenuItemWithTooltip = ({ to, icon, children, tooltipText, onClick }) => (
  <OverlayTrigger
    key="bottom"
    placement="right"
    overlay={<Tooltip id={`tooltip-${to}`}>{tooltipText}</Tooltip>}
  >
    {onClick ? (
      <button onClick={onClick} className="sidebar-logout-button">
        <CDBSidebarMenuItem icon={icon} style={{ margin: '2px 0' }}>{children}</CDBSidebarMenuItem>
      </button>
    ) : (
      <NavLink exact to={to} activeClassName="activeClicked">
        <CDBSidebarMenuItem icon={icon} style={{ margin: '2px 0' }}>{children}</CDBSidebarMenuItem>
      </NavLink>
    )}
  </OverlayTrigger>
);

const Sidebar = ({ isActive, handleLogout }) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'scroll initial',
        pointerEvents: isActive ? 'auto' : 'none',
        opacity: isActive ? 1 : 0.5,
      }}
      className="sidebar"
    >
      <CDBSidebar textColor="#fff" backgroundColor="#53958f">
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large"></i>}
          className="text-center"
          style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#53958f' }}
        >
          <NavLink exact to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <h5 style={{ margin: 0 }}>GHAA Inventory</h5>
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu style={{ marginTop: '-10px' }}>
            <SidebarMenuItemWithTooltip to="/dashboard" icon="columns" tooltipText="Dashboard">
              Dashboard
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/user" icon="user" tooltipText="Manage Users">
              Manage Users
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/location" icon="landmark" tooltipText="Locations">
              Locations
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/custodian" icon="handshake" tooltipText="Custodian">
              Custodian
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/unit" icon="calculator" tooltipText="Units">
              Units
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/category" icon="clipboard-list" tooltipText="Category">
              Category
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/product" icon="shopping-bag" tooltipText="Item">
              Item
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/supplier" icon="box-open" tooltipText="Supplier">
              Supplier
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/receiver" icon="user-clock" tooltipText="Receiver">
              Receiver
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/supply" icon="warehouse" tooltipText="Inventory">
              Inventory
            </SidebarMenuItemWithTooltip>

            <SidebarMenuItemWithTooltip to="/inventory" icon="table" tooltipText="Report">
              Report
            </SidebarMenuItemWithTooltip>

            {/* Logout Button */}
            <OverlayTrigger
              key="bottom"
              placement="right"
              overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                style={{ cursor: 'pointer', margin: '2px 0' }}
              >
                <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
              </div>
            </OverlayTrigger>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '10px 2px' }}>
            {/* Footer content can go here */}
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
