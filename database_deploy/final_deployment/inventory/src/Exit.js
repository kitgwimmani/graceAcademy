import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Dropdown, Button, ButtonGroup, Table, Modal, Form, Container, InputGroup, } from 'react-bootstrap';
import './App.css';

function Exit() {
    const [exit, setExit] = useState([]);
    const [search, setSearch] = useState('');
    const [quantity, setQuantity] = useState('');
    const [remark, setRemark] = useState('');
    const [product, setProduct] = useState([]);
    const [unitSums, setUnitSums] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://ghaacademy.com.ng/getExitedItems/${id}`).then(res => setExit(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
        try {
            if (confirmDelete()) {
                await axios.delete('https://ghaacademy.com.ng/deleteExitedItem/' + exitedData.item_id)
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }

    }
    const confirmDelete = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        return isConfirmed
    }

    const [exitedData, setExitedData] = useState({
        item_id: 0,
        unit: '',
        quantity: 0,
        remark: ''
    });

    //--------------Modal---------------------
    const [showModalExited, setShowModalExited] = useState(false);

    const handleCloseModalExited = () => setShowModalExited(false);


    const handleShowModalExited = (item_id, unit, quantity, remark) => {
        setExitedData({ item_id, unit, quantity, remark });
        setShowModalExited(true);
    };

    function handleSubmitExited(event) {
        event.preventDefault();
        alert(exitedData.item_id)
        axios.put('https://ghaacademy.com.ng/updateExitedItem/' + exitedData.item_id, {quantity, remark}).then(res => {
            console.log(res);
            navigate(0);
        }).catch(err => console.log(err));
    }
    return (
        <div className='main-content'>
            <Container>
                <h5 className='mt-4'>Exited Items List</h5>
                <Form>
                    <InputGroup className='my-3' style={{ width: '96%' }}>
                        <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Item' />
                    </InputGroup>

                </Form>
                <div style={{ width: '96%', height: '400px', overflow: 'auto' }}>
                    <Table striped bordered style={{ fontSize: '14px' }}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th>Receiver</th>
                                <th>Remark</th>
                                <th>Date Reported</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exit.filter((data) => {
                                    const searchLower = search.toLowerCase();
                                    //specific   return search.toLowerCase()=== ''? data : data.item.toLowerCase().includes(search)
                                    return (
                                        searchLower === '' ||
                                        Object.values(data).some(
                                            (value) =>
                                                value && value.toString().toLowerCase().includes(searchLower)
                                        )
                                    );
                                }).map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.product}</td>
                                        <td>{data.unit}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.receiver}</td>
                                        <td>{data.remark}</td>
                                        <td>
                                            {new Date(data.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <button onClick={() => handleShowModalExited(data.id, data.unit, data.quantity, data.remark)} className='btn btn-light'>Update</button>
                                                <Dropdown >
                                                    <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={e => handleDelete(data.id)}>Delete</Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </Table>
                </div>

                <Modal show={showModalExited} onHide={handleCloseModalExited}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update {product} Exited</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>

                            <div className='col-12'>
                                <label htmlFor=''>Quantity</label>
                                <input type='number'
                                    placeholder='Enter Quantity'
                                    required
                                    value={quantity}
                                    className='form-control'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='col-12'>
                                <label htmlFor=''>Remark</label>
                                <textarea
                                    placeholder='Please describe what happened'
                                    className='form-control'
                                    onChange={e => setRemark(e.target.value)}
                                />
                            </div>



                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleCloseModalExited}>
                            Close
                        </Button>
                        <Button variant="light" onClick={handleSubmitExited}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        </div>
    )
}

export default Exit