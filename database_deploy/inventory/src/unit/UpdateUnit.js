import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import '../App.css';

function UpdateUnit() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/getUnit/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setName(userData[0].name);
                    setDescription(userData[0].description);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/updateUnit/'+id, {name, description}).then(res => {
            console.log(res);
            navigate('/unit');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Update Unit</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Category Name</label>
                    <input type='text' 
                        placeholder='Enter Unit Name' 
                        className='form-control'
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                    
                </div>

                <div className='mb-2'>
                    <label htmlFor=''>Description</label>
                    <input type='text' 
                        placeholder='Enter Description' 
                        className='form-control'
                        value={description}
                        required
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <ButtonGroup>
                    <button className='btn secondary' onClick={handleGoBack}>Go Back</button>
                    <button className='btn success'>Update</button>
                </ButtonGroup>
            </form>
        </div>
    </div>
  )
}

export default UpdateUnit