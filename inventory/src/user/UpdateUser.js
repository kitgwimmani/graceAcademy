import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

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
                console.log(userData[0].name);

                // Check if userData exists and has the expected properties
                
                    setName(userData[0].name);
                    setEmail(userData[0].email);
                    setRole(userData[0].role);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };


    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateUser/${id}`, { name, email, role })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }
     ////for searcheable role
     const roleOptions = [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ];

    const handleRoleChange = (selectedOption) => {
        setRole(selectedOption ? selectedOption.value : '');
    };
    //##############################
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
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
                            required
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
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='role'>Role</label>
                        <Select
                            options={roleOptions}
                            value={roleOptions.find((option) => option.value === role)}
                            onChange={handleRoleChange}
                        />
                    </div>
                    <ButtonGroup>
                        <button className='btn btn-primary' onClick={handleGoBack}>Go Back</button>
                        <button className='btn btn-success'>Update</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
