import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup, Table } from 'react-bootstrap';
import Select from 'react-select';
import '../App.css';
function ManageSupply() {
    const [allProducts, setAllProducts] = useState([]);
    const [unitSums, setUnitSums] = useState([]);
    const [allCustodians, setProductCustodians] = useState([]);
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/getProductSupplied/${id}`)
            .then(res => {
                setAllProducts(res.data);
                const userData = res.data;
                setProduct(userData[0].item);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        //get from view
        axios.get(`http://localhost:8081/getProductCustodians/${id}`)
            .then(res => {
                setProductCustodians(res.data);
                //const userData = res.data;
                
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8081/getProductUnitSums/${id}`)
            .then(res => {
                setUnitSums(res.data);
                const userData = res.data;
            })
            .catch(err => console.log(err));
    }, [])



    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };
    function handleSubmit(event) {

    }

    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Manage <b className='danger'>[{product}]</b></h2>
                    <Table striped bordered hover style={{ fontSize: '12px', marginBottom: '20px' }}>

                        <thead>
                            <tr>
                                <th>Date Supplied</th>
                                <th>Supplier</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th>Expiry Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                allProducts.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.date}</td>
                                        <td>{data.supplier}</td>
                                        <td>{data.unit}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.expiry_date}</td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    </Table>
                    <div className='row'>
                        <div className='mb-2 col-4'>
                            <h6>Inventory</h6>
                            <Table bordered striped style={{ fontSize: '12px', marginBottom: '20px' }}>
                                <thead>
                                    <tr>
                                        <th>Unit</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        unitSums.map((data, i) => (
                                            <tr key={i}>
                                                <td>{data.unit}</td>
                                                <td>{data.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className='mb-2 col-8'>
                            <h6>Custodian/location</h6>
                            <Table bordered striped style={{ fontSize: '12px', marginBottom: '20px' }}>
                                <thead>
                                    <tr>
                                        <th>Custodian</th>
                                        <th>Quantity</th>
                                        <th>Date Moved</th>
                                        <th>Date Expected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allCustodians.map((data, i) => (
                                            <tr key={i}>
                                                <td>{data.cname}</td>
                                                <td>{data.quantity}</td>
                                                <td>{data.date_moved}</td>
                                                <td>{data.date_expected}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>


                    <ButtonGroup>
                        <button className='btn secondary' onClick={handleGoBack}>Go Back</button>
                        <button className='btn success'>Move Item</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}

export default ManageSupply