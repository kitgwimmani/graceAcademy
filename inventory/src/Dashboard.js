import React from 'react'
//import axios from 'axios';

//import Notification from './components/Notification';
import { Container, Row, Col } from 'react-bootstrap';

import { FaFileAlt, FaBell, FaBars, FaLock, FaUser, FaArrowRight  } from 'react-icons/fa';
import IconMenu from './components/IconMenu';

function Dashboard() {
  
 
  return (
    <Container>
      <h3 className='mt-4'>Dashboard</h3>

      <Row >
      
        <Col >
        
        <Row>
        <Col sm={12} md={2}><IconMenu icon={FaFileAlt} title="Reports" page="/inventory" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaBell} title="Notifications" page="/notifications" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaBars} title="Reorder" page="/supply" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaLock} title="Access" page="/" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaArrowRight} title="Move Items" page="/supply" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaUser} title="Change Cus" page="/supply" /></Col>
        </Row>
        
        
        </Col>

       </Row>

    </Container>


  )
}

export default Dashboard