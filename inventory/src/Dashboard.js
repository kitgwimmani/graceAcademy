import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Notification from './components/Notification';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard() {
  
  const [inventory, setInventory] = useState([])
  const [supply, setSupply] = useState([])
  const [stockLevel, setStockLevel] = useState([])
  const [expiration, setExpiration] = useState([])

  const today = new Date().toISOString().split('T')[0];
  


  useEffect(() => {
    axios.get('http://localhost:8081/inventory').then(res => setInventory(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/supply').then(res => setSupply(res.data))
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

  return (
    <Container>
      <h3 className='m-4'>Dashboard</h3>
      
      

      <Row className='m-4'>
      
        <Col sm={12} md={4}>
        <h5 className='m-4'>Quick Links & Notifications</h5>
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

          <br></br>
          <Notification
            title="Move Item"
            page="/supply"
          />

          <br></br>
          <Notification
            title="Change Custodian/Location"
            page="/supply"
          />
        </Col>
        

        <Col sm={12} md={8}>
        <h5 className='m-4'>Actions</h5>
          <Notification
            title="Supplies"
            count={supply.filter(supply => supply.supply_date === today).length}
            page="/supply"
          />
        </Col>

       </Row>

    </Container>


  )
}

export default Dashboard