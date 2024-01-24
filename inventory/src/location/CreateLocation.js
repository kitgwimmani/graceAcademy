import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateLocation() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/createLocation', {name}).then(res => {
            console.log(res);
            navigate('/location');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Location</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Location Name</label>
                    <input type='text' placeholder='Enter Location Name' className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>
               
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateLocation