import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import '../App.css';

function CreateLocation() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event){
        event.preventDefault();
        axios.post('https://ghaacademy.com.ng/createLocation', {name}).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Location</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Location Name</label>
                    <input type='text' 
                        placeholder='Enter Location Name' 
                        required
                        className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>
                <ButtonGroup>
                    <button className='btn secondary' onClick={handleGoBack}>Go Back</button>
                    <button className='btn success'>Submit</button>
                </ButtonGroup>
            </form>
        </div>
    </div>
  )
}

export default CreateLocation