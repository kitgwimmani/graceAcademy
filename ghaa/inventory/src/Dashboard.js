import React, { useEffect, useState } from 'react'
import axios from 'axios';

import DashboardCard from './components/DashboardCard';

function Dashboard() {
  const [user, setUser] = useState([])
  const [custodian, setCustodian] = useState([])
  const [location, setLocation] = useState([])
  const [product, setProduct] = useState([])
  const [supplier, setSupplier] = useState([])
  const [receiver, setReceiver] = useState([])
  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/').then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/custodian').then(res => setCustodian(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/location').then(res => setLocation(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/product').then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/supplier').then(res => setSupplier(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('https://graceaaapi.cloudsync.com.ng/receiver').then(res => setReceiver(res.data))
      .catch(err => console.log(err));
  }, [])
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
        <div className='row text-align-center'>
          <div className='col-4'>
            <DashboardCard
              title="Users"
              count={user.length}
            />
          </div>

          <div className='col-4'>
            <DashboardCard
              title="Custodians"
              count={custodian.length}
            />
          </div>

          <div className='col-4'>
            <DashboardCard
              title="Locations"
              count={location.length}
            />
          </div>
        </div>

        <br></br>

        <div className='row text-align-center'>
          <div className='col-4'>
            <DashboardCard
              title="Products/Items"
              count={product.length}
            />
          </div>

          <div className='col-4'>
            <DashboardCard
              title="Suppliers"
              count={supplier.length}
            />
          </div>

          <div className='col-4'>
            <DashboardCard
              title="Deliveries"
              count={receiver.length}
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard