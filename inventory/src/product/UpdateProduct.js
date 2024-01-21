import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [consumable, setConsumable] = useState('');
    const [traceable, setTraceable] = useState('');
    const [description, setDescription] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiration, setExpiration] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const [threshold, setThreshold] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [isbn, setIsbn] = useState('');
    const [barcode, setBarcode] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/getProduct/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setName(userData[0].name);
                    setConsumable(userData[0].consumable);
                    setTraceable(userData[0].traceable);
                    setDescription(userData[0].description);
                    setUnit(userData[0].unit);
                    setQuantity(userData[0].quantity);
                    setExpiration(userData[0].expiration);
                    setExpiryDate(userData[0].expiry_date);
                    setThreshold(userData[0].threshold);
                    setSerialNumber(userData[0].serial_number);
                    setIsbn(userData[0].isbn);
                    setBarcode(userData[0].barcode);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/updateProduct/'+id, { name, category, consumable, traceable, description, unit, quantity, expiration, expiry_date, threshold, serial_number, isbn, barcode }).then(res => {
            console.log(res);
            navigate('/product');
        }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} >
                    <h2>Add Item to Inventory</h2>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor=''>Item Name</label>
                                <input type='text' placeholder='Enter Item Name' className='form-control'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />

                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor='category'>Category</label>
                                <select
                                    id='category'
                                    className='form-control'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value='' disabled>Select Categort</option>
                                    <option value='curriculum'>Curriculum </option>
                                    <option value='ittech'>IT/Tech</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-md-6'>

                            <div className='mb-2'>
                                <label>
                                    <input type='checkbox' className='mr-2' onChange={() => setConsumable(!consumable)} />
                                    Consumable
                                </label>
                            </div></div>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label>
                                    <input type='checkbox' className='mr-2' onChange={() => setTraceable(!traceable)} />
                                    Traceable
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor=''>Description</label>
                                <textarea
                                    placeholder='Enter Description'
                                    className='form-control'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor='unit'>Unit</label>
                                <select
                                    id='unit'
                                    className='form-control'
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                >
                                    <option value='' disabled>Select Unit</option>
                                    <option value='pack'>Pack</option>
                                    <option value='bunch'>bunch</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor=''>Quantity</label>
                                <input type='number' placeholder='Enter quantity' className='form-control'
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>
                        
                            <div className='col-md-2'>
                                <div className='mb-2'>
                                    <label>
                                    <br></br>
                                        <input type='checkbox' className='mr-2' onChange={() => setExpiration(!expiration)} />
                                        Can Expire
                                    </label>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='mb-2'>
                                    <label htmlFor=''>Expiration Date</label>
                                    <input type='date' placeholder='Enter Expiration Date' className='form-control'
                                        value={expiry_date}
                                        onChange={e => setExpiryDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        
                    </div>

                    
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor=''>Threshold</label>
                                <input type='number' placeholder='Enter Threshold' className='form-control'
                                    value={threshold}
                                    onChange={e => setThreshold(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor=''>Serial Number</label>
                                <input type='text' placeholder='Enter Serial Number' className='form-control'
                                    value={serial_number}
                                    onChange={e => setSerialNumber(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor=''>ISBN</label>
                                <input type='text' placeholder='Enter ISBN' className='form-control'
                                    value={isbn}
                                    onChange={e => setIsbn(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor=''>Barcode</label>
                                <input type='text' placeholder='Enter Barcode' className='form-control'
                                    value={barcode}
                                    onChange={e => setBarcode(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>


                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct