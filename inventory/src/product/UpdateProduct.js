import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/updateProduct/'+id, {name, description}).then(res => {
            console.log(res);
            navigate('/product');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Update Item</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Item Name</label>
                    <input type='text' placeholder='Enter Item Name' className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Description</label>
                    <input type='text' placeholder='Enter Description' className='form-control'
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateProduct