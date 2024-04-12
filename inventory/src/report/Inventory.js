
import React, { useEffect, useState } from 'react'
import axios from 'axios';

//import Notification from './components/Notification';
import { Container, Row, Col, Modal } from 'react-bootstrap';

import { FaTruck, FaMapMarkedAlt, FaUserTie, FaSyncAlt, FaExclamationTriangle, FaWarehouse, FaArrowsAlt, FaBoxes  } from 'react-icons/fa';
import IconMenuDark from '../components/IconMenuDark';

function Dashboard() {
  const [inventory, setInventory] = useState([])
  const [stockLevel, setStockLevel] = useState([])
  const [expiration, setExpiration] = useState([])
  const [post_date, setPostDate] = useState([])

  
  useEffect(() => {
    axios.get('http://localhost:8081/inventory').then(res => setInventory(res.data))
      .catch(err => console.log(err));
  }, [])

  

  useEffect(() => {
    axios.get('http://localhost:8081/stock_level').then(res => setStockLevel(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/expiration_status').then(res => setExpiration(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/post_date').then(res => setPostDate(res.data))
      .catch(err => console.log(err));
  }, [])

 
  return (
    <Container>
      <h3 className='mt-4'>Reports</h3>

      <Row >
      
        <Col >
        
        <Row>
        <Col sm={12} md={2}><IconMenuDark icon={FaTruck} title="Delivery" page="/supply_report" /></Col>
        <Col sm={12} md={2}><IconMenuDark icon={FaMapMarkedAlt} title="Locations" page="/notifications" /></Col>
        <Col sm={12} md={2}><IconMenuDark icon={FaUserTie} title="Custodian" page="/supply" /></Col>
        <Col sm={12} md={2}><IconMenuDark icon={FaSyncAlt} title="Reorder" page="/" /></Col>
        <Col sm={12} md={2}><IconMenuDark icon={FaExclamationTriangle} title="Damage" page="/supply" /></Col>
        <Col sm={12} md={2}><IconMenuDark icon={FaWarehouse} title="Storeroom" page="/supply" /></Col>
        </Row>
        <br></br>
        <Row>
        <Col sm={12} md={2}><IconMenuDark icon={FaArrowsAlt} title="Movement" page="/supply" /></Col>
        <Col sm={12} md={2}><IconMenuDark icon={FaBoxes} title="Category" page="/supply" /></Col>
        </Row>
        
        <h3 className='mt-4'>Saved Reports</h3>

        
        
        </Col>

       </Row>

    </Container>


  )
}

export default Dashboard