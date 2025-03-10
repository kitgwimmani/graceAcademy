import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import Barcode from 'react-barcode';
import Select from 'react-select';
import '../App.css';

function CreateSupply() {
    const [product, setProduct] = useState('');
    const [supplier, setSupplier] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState(1); // Default quantity
    const [expiry_date, setExpiryDate] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [isbn, setIsbn] = useState('');
    const [barcode, setBarcode] = useState('');
    const [remark, setRemark] = useState('');
    const [supply_date, setSupplyDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const [current_product, setCurrentProduct] = useState({});
    const [allSuppliers, setAllSuppliers] = useState([]);
    const [allUnits, setAllUnits] = useState([]);

    // Fetch product list
    useEffect(() => {
        axios.get('https://ghaacademy.com.ng/product')
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch specific product
    useEffect(() => {
        axios.get(`https://ghaacademy.com.ng/getProduct/${id}`)
            .then(res => {
                const userData = res.data;
                if (userData.length > 0) {
                    setCurrentProduct(userData[0]);
                    setIsbn(userData[0].isbn);
                    setSerialNumber(userData[0].serial_number);
                    setBarcode(userData[0].barcode);
                } else {
                    console.error("No product data found");
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    // Fetch supplier list
    useEffect(() => {
        axios.get('https://ghaacademy.com.ng/supplier')
            .then(res => setAllSuppliers(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch unit list
    useEffect(() => {
        axios.get('https://ghaacademy.com.ng/unit')
            .then(res => setAllUnits(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleGoBack = () => navigate(-1);

    const handleAddProduct = () => navigate('/product/createProduct');
    const handleAddSupplier = () => navigate('/supplier/createSupplier');
    const handleAddUnit = () => navigate('/unit/createUnit');

    const handleSubmit = (event) => {
        event.preventDefault();
        const supplyData = {
            product,
            supplier,
            unit,
            quantity,
            expiry_date,
            serial_number,
            isbn,
            barcode,
            remark,
            supply_date,
        };
        console.log(supplyData);
        axios.post('https://ghaacademy.com.ng/createSupply/' + id, supplyData)
  .then(res => {
    // Handle successful creation
    console.log('Supply created successfully:', res.data); // Assuming data contains created supply info
    navigate('/supply');
  })
  .catch(err => {
    // Handle creation error
    console.error('Error creating supply:', err);
    // Optionally, display an error message to the user
  });
    };

    const supplierOptions = allSuppliers.map((supplier) => ({
        value: supplier.id,
        label: `${supplier.name} (${supplier.phone})`,
    }));

    const handleSupplierChange = (selectedOption) => {
        setSupplier(selectedOption ? selectedOption.value : '');
    };

    const unitOptions = allUnits.map((unit) => ({
        value: unit.id,
        label: unit.name,
    }));

    const handleUnitChange = (selectedOption) => {
        setUnit(selectedOption ? selectedOption.value : '');
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-75 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add Stock</h2>
                    <div className="row">
                        <div className="mb-2 col-6">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="">Item</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Item"
                                        className="form-control prefill"
                                        value={current_product.name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="col-2">
                                    <br />
                                    <button type="button" className="btn success" onClick={handleAddProduct}>+</button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-2 col-6">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="supplier">Supplier</label>
                                    <Select
                                        options={supplierOptions}
                                        value={supplierOptions.find(option => option.value === supplier)}
                                        onChange={handleSupplierChange}
                                        placeholder="Select a supplier"
                                    />
                                </div>
                                <div className="col-2">
                                    <br />
                                    <button type="button" className="btn success" onClick={handleAddSupplier}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-2 col-6">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="unit">Unit</label>
                                    <Select
                                        options={unitOptions}
                                        value={unitOptions.find(option => option.value === unit)}
                                        onChange={handleUnitChange}
                                        placeholder="Select a unit"
                                    />
                                </div>
                                <div className="col-2">
                                    <br />
                                    <button type="button" className="btn success" onClick={handleAddUnit}>+</button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-2 col-6">
                            <label htmlFor="">Quantity</label>
                            <input
                                type="number"
                                placeholder="Enter Quantity"
                                required
                                className="form-control"
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-2 col-6">
                            <label htmlFor="">Expiration Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={expiry_date}
                                onChange={e => setExpiryDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-2 col-6">
                            <label htmlFor="">Serial Number</label>
                            <input
                                type="text"
                                className="form-control prefill"
                                value={current_product.serial_number || ''}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-2 col-6">
                            <label htmlFor="">ISBN</label>
                            <input
                                type="text"
                                className="form-control prefill"
                                value={current_product.isbn || ''}
                                readOnly
                                
                            />
                            <label htmlFor="">Remark</label>
                            <textarea
                                placeholder="Enter Remark"
                                className="form-control"
                                value={remark}
                                onChange={e => setRemark(e.target.value)}
                            />
                            <label htmlFor="">Supply Date</label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                value={supply_date}
                                onChange={e => setSupplyDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-2 col-6">
                            <label htmlFor="">Barcode</label>
                            <Barcode value={current_product.barcode || 'N/A'} />
                            <input
                                type="text"
                                className="form-control prefill"
                                value={current_product.barcode || ''}
                                readOnly
                            />
                        </div>
                    </div>

                    <ButtonGroup>
                        <button type="button" className="btn secondary" onClick={handleGoBack}>Go Back</button>
                        <button type="submit" className="btn success">Submit</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}

export default CreateSupply;
