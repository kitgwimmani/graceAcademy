import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCustodian() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/createCustodian', {name, email}).then(res => {
            console.log(res);
            navigate('/custodian');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Custodian</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Custodian Name</label>
                    <input type='text' placeholder='Enter Custodian Name' className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type='email' placeholder='Enter Email' className='form-control'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

               
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateCustodian