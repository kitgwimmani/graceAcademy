import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import '../App.css';

function UpdateLocation() {
    const [name, setName] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://ghaacademy.com.ng/getLocation/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setName(userData[0].name);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event){
        event.preventDefault();
        axios.put('https://ghaacademy.com.ng/updateLocation/'+id, {name}).then(res => {
            console.log(res);
            navigate('/location');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Update Location</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Location Name</label>
                    <input type='text' 
                        placeholder='Enter Location Name' 
                        className='form-control'
                        value ={name}
                        required
                        onChange={e => setName(e.target.value)}
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

export default UpdateLocation