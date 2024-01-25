import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardCard from './components/DashboardCard';

function Dashboard() {
  const [user, setUser] = useState([])
  const [custodian, setCustodians] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8081/').then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/custodian').then(res => setCustodians(res.data))
      .catch(err => console.log(err));
  }, [])
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
      <div className='w-60 bg-white rounded p-3'>
      <div className='row text-align-center'>
      <div className='col-6'>
        <DashboardCard 
          title="Users"
          count={user.length}
        />
        </div>

        <div className='col-6'>
        <DashboardCard
          title="Custodians"
          count={custodian.length} 
        />
        </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard