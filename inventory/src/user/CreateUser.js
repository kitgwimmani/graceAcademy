import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/createUser', {name, email, role}).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add User</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Name</label>
                    <input type='text' 
                        placeholder='Enter Name' 
                        required
                        className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type='email' 
                        placeholder='Enter Email' 
                        required
                        className='form-control'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-2'>
                <label htmlFor='role'>Role</label>
                <select
                    id='role'
                    className='form-control'
                    value={role}
                    required
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value='' disabled>Select Role</option>
                    <option value='admin'>admin</option>
                    <option value='user'>user</option>
                </select>
                </div>
                <ButtonGroup>
                    <button className='btn btn-primary' onClick={handleGoBack}>Go Back</button>
                    <button className='btn btn-success'>Submit</button>
                </ButtonGroup>
            </form>
        </div>
    </div>
  )
}

export default CreateUser