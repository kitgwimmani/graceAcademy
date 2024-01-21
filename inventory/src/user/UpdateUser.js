import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data by ID and set the initial state values
        axios.get(`http://localhost:8081/getUser/${id}`)
            .then(res => {
                const userData = res.data; // Assuming the fetched data has fields: name, email, role
                setName(userData.name);
                setEmail(userData.email);
                setRole(userData.role);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateUser/${id}`, { name, email, role })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='role'>Role</label>
                        <select
                            id='role'
                            className='form-control'
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value='' disabled>Select Role</option>
                            <option value='admin'>admin</option>
                            <option value='user'>user</option>
                        </select>
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
