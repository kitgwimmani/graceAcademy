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


const SidebarMenuItemWithTooltip = ({ to, icon, children, tooltipText }) => (
  <OverlayTrigger
    key="bottom"
    placement="right"
    overlay={<Tooltip id={`tooltip-${to}`}>{tooltipText}</Tooltip>}
  >
    <NavLink exact to={to} activeClassName="activeClicked">
      <CDBSidebarMenuItem icon={icon} style={{ margin: '2px 0' }}>{children}</CDBSidebarMenuItem>
    </NavLink>
  </OverlayTrigger>
);

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }} className='sidebar'>
      <CDBSidebar textColor="#fff" backgroundColor="#53958f">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} className="text-center" style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#53958f' }}>
          <NavLink exact to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <h5 style={{ margin: 0 }}>GHAA Inventory</h5>
          </NavLink>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu style={{ marginTop: '-10px' }}>
            <SidebarMenuItemWithTooltip  to="/dashboard" icon="columns" tooltipText="Dashboard" >
              Dashboard
            </SidebarMenuItemWithTooltip>
            
            <SidebarMenuItemWithTooltip to="/" icon="user" tooltipText="Manage Users">
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

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '10px 2px',
            }}
          >
            {/* ... Footer content */}
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
