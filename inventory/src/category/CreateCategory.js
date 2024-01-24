import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCategory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/createCategory', {name, description}).then(res => {
            console.log(res);
            navigate('/category');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Category</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Category Name</label>
                    <input type='text' placeholder='Enter Category Name' className='form-control'
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Description</label>
                    <input type='text' placeholder='Enter Description' className='form-control'
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

               
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateCategory