import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ButtonGroup } from 'react-bootstrap';

function CreateCustodian() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('https://graceaaapi.cloudsync.com.ng/createCustodian', { name, email }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Custodian</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Custodian Name</label>
                        <input type='text' 
                            placeholder='Enter Custodian Name' 
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


                    
                    <ButtonGroup>
                    <button className='btn btn-primary' onClick={handleGoBack}>Go Back</button>
                    <button className='btn btn-success'>Submit</button>
                    </ButtonGroup>

                </form>
                
            </div>
        </div>
    )
}

export default CreateCustodian