import React, { useEffect, useState } from 'react'
import axios from 'axios';

import DashboardCard from './components/DashboardCard';
import Notification from './components/Notification';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard() {
  const [user, setUser] = useState([])
  const [custodian, setCustodian] = useState([])
  const [location, setLocation] = useState([])
  const [product, setProduct] = useState([])
  const [supplier, setSupplier] = useState([])
  const [receiver, setReceiver] = useState([])

  const [inventory, setInventory] = useState([])
  const [supply, setSupply] = useState([])
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    axios.get('http://localhost:8081/').then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/custodian').then(res => setCustodian(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/location').then(res => setLocation(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/product').then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/supplier').then(res => setSupplier(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/receiver').then(res => setReceiver(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/inventory').then(res => setInventory(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/supply').then(res => setSupply(res.data))
      .catch(err => console.log(err));
  }, [])
  return (
    <Container>
      <h3 className='m-4'>Dashboard</h3>
      <Row className='m-4'>
        <Col sm={12} md={4}>
          <DashboardCard
            title="Users"
            count={user.length}
            page="/"
          />
        </Col>

        <Col sm={12} md={4}>
          <DashboardCard
            title="Custodians"
            count={custodian.length}
            page="/custodian"
          />
        </Col>

        <Col sm={12} md={4}>
          <DashboardCard
            title="Locations"
            count={location.length}
            page="/location"
          />
        </Col>
      </Row>



      <Row className='m-4'>
        <Col sm={12} md={4}>
          <DashboardCard
            title="Products/Items"
            count={product.length}
            page="/product"
          />
        </Col>

        <Col sm={12} md={4}>
          <DashboardCard
            title="Suppliers"
            count={supplier.length}
            page="/supplier"
          />
        </Col>

        <Col sm={12} md={4}>
          <DashboardCard
            title="Deliveries"
            count={receiver.length}
            page="/receiver"
          />
        </Col>
      </Row>

      <h3 className='m-4'>Quick Links & Notifications</h3>

      <Row className='m-4'>
        <Col sm={6} md={2}>
          <Notification
            title="Report"
            count={inventory.filter(inventory => inventory.date === today).length}
            page="/inventory"
          />
        </Col>

        <Col sm={6} md={2}>
          <Notification
            title="Supplies"
            count={supply.filter(supply => supply.supply_date === today).length}
            page="/supply"
          />
        </Col>

        <Col sm={6} md={2}>
          <Notification
            title="Deliveries"
            count={0}
            page="/receiver"
          />
        </Col>

        
        <Col sm={6} md={2}>
          <Notification
            title="Users"
            count={1}
            page="/"
          />
        </Col>

        
        <Col sm={6} md={2}>
          <Notification
            title="Custodians"
            count={receiver.length}
            page="/custodian"
          />
        </Col>

        
        <Col sm={6} md={2}>
          <Notification
            title="Inventory"
            count={inventory.filter(inventory => inventory.date === today).length}
            page="/supply"
          />
        </Col>
      </Row>

    </Container>


  )
}

export default Dashboard