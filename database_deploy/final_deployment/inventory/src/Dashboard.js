
import React, { useEffect, useState } from 'react'
import axios from 'axios';

//import Notification from './components/Notification';
import { Container, Row, Col } from 'react-bootstrap';

import { FaFileAlt, FaBell, FaBars, FaLock, FaUser, FaArrowRight  } from 'react-icons/fa';
import IconMenu from './components/IconMenu';

function Dashboard() {
  const [inventory, setInventory] = useState([])
  const [stockLevel, setStockLevel] = useState([])
  const [expiration, setExpiration] = useState([])
  const [post_date, setPostDate] = useState([])

  
  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/inventory').then(res => setInventory(res.data))
      .catch(err => console.log(err));
  }, [])

  

  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/stock_level').then(res => setStockLevel(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/expiration_status').then(res => setExpiration(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://ghaacademy.com.ng/post_date').then(res => setPostDate(res.data))
      .catch(err => console.log(err));
  }, [])

 
  return (
    <Container>
      <h3 className='mt-4'>Dashboard</h3>

      <Row >
      
        <Col >
        
        <Row>
        <Col sm={12} md={2}><IconMenu icon={FaFileAlt} title="Reports" page="/inventory" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaBell} title="Notifications" page="/notifications" count={expiration.length+stockLevel.length+post_date.length}/></Col>
        <Col sm={12} md={2}><IconMenu icon={FaBars} title="Reorder" page="/supply" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaLock} title="Access" page="/" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaArrowRight} title="Move Items" page="/supply" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaUser} title="Change Custodian" page="/supply" /></Col>
        </Row>
        
        
        </Col>

       </Row>

    </Container>


  )
}

export default Dashboard