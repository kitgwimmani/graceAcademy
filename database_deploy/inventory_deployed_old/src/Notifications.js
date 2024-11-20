import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Notification from './components/Notification';
import { Container, Row, Col } from 'react-bootstrap';

//import { FaFileAlt, FaBell, FaBars, FaLock, FaUser, FaArrowRight  } from 'react-icons/fa';
//import IconMenu from './components/IconMenu';

function Notifications() {
  
  const [inventory, setInventory] = useState([])
  const [stockLevel, setStockLevel] = useState([])
  const [expiration, setExpiration] = useState([])
  const [post_date, setPostDate] = useState([])

  const today = new Date().toISOString().split('T')[0];
  


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
    <Container >
      <h3 className='mt-4'>Notifications</h3>

      <Row >
      
        <Col sm={12} md={4}>
        
          <Notification
            title="New Inventory"
            count={inventory.filter(inventory => inventory.date === today).length}
            page="/inventory"
          />
          <br></br>
          <Notification
            title="Items below threshold"
            count={stockLevel.length}
            page="/threshold"
          />

          <br></br>
          <Notification
            title="Items expiration Status"
            count={expiration.length}
            page="/expiration"
          />

          
        </Col>
        

        <Col sm={12} md={4}>
        
          <Notification
            title="New Supplier"
            page="/supply"
          />

          <br></br>
          <Notification
            title="Items due to return"
            count={post_date.length}
            page="/post_date"
          />

          <br></br>
          <Notification
            title="Items Exited"
            page="/"
          />

 
        
        </Col>

        <Col sm={12} md={4}>
          <Notification
            title="New Receiver"
            page="/supply"
          />

          <br></br>
          <Notification
            title="Reminders"
            page="/supply"
          />

          <br></br>
          <Notification
            title="Role changes"
            page="/"
          />

 
        
        </Col>

       </Row>

    </Container>


  )
}

export default Notifications