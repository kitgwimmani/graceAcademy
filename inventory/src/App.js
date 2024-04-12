import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import Sidebar from './components/Sidebar';


import User from './User';
import CreateUser from './user/CreateUser';
import UpdateUser from './user/UpdateUser';

import Category from './Category';
import CreateCategory from './category/CreateCategory';
import UpdateCategory from './category/UpdateCategory';

import Custodian from './Custodian';
import CreateCustodian from './custodian/CreateCustodian';
import UpdateCustodian from './custodian/UpdateCustodian';

import Location from './Location';
import CreateLocation from './location/CreateLocation';
import UpdateLocation from './location/UpdateLocation';

import Unit from './Unit';
import CreateUnit from './unit/CreateUnit';
import UpdateUnit from './unit/UpdateUnit';

import Product from './Product';
import CreateProduct from './product/CreateProduct';
import UpdateProduct from './product/UpdateProduct';

import Supplier from './Supplier';
import CreateSupplier from './supplier/CreateSupplier';
import UpdateSupplier from './supplier/UpdateSupplier';

import Receiver from './Receiver';
import CreateReceiver from './receiver/CreateReceiver';
import UpdateReceiver from './receiver/UpdateReceiver';

import Supply from './Supply';
import CreateSupply from './supply/CreateSupply';
import UpdateSupply from './supply/UpdateSupply';
import ManageSupply from './supply/ManageSupply';

import Dashboard from './Dashboard';

import Inventory from './report/Inventory';
import Expiration from './report/Expiration';
import Threshold from './report/Threshold';
import Notifications from './Notifications';
import PostDate from './report/PostDate';
import SupplyReport from './report/SupplyReport';


function App() {
  return (
    <div className="app-container">
    
    <BrowserRouter>
    <div className="sidebar">
    <Sidebar/>
    </div>
      <div className='main-content'>
      <Routes>
      
        <Route path='/user' element={<User />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path='/updateUser/:id' element={<UpdateUser />}></Route>

        <Route path='/category' element={<Category />}></Route>
        <Route path='category/createCategory' element={<CreateCategory />}></Route>
        <Route path='category/updateCategory/:id' element={<UpdateCategory />}></Route>

        <Route path='/custodian' element={<Custodian />}></Route>
        <Route path='custodian/createCustodian' element={<CreateCustodian />}></Route>
        <Route path='custodian/updateCustodian/:id' element={<UpdateCustodian />}></Route>

        <Route path='/location' element={<Location />}></Route>
        <Route path='location/createLocation' element={<CreateLocation />}></Route>
        <Route path='location/updateLocation/:id' element={<UpdateLocation />}></Route>

        <Route path='/unit' element={<Unit />}></Route>
        <Route path='unit/createUnit' element={<CreateUnit />}></Route>
        <Route path='unit/updateUnit/:id' element={<UpdateUnit />}></Route>

        <Route path='/product' element={<Product />}></Route>
        <Route path='product/createProduct' element={<CreateProduct />}></Route>
        <Route path='product/updateProduct/:id' element={<UpdateProduct />}></Route>

        <Route path='/supplier' element={<Supplier />}></Route>
        <Route path='supplier/createSupplier' element={<CreateSupplier />}></Route>
        <Route path='supplier/updateSupplier/:id' element={<UpdateSupplier />}></Route>

        <Route path='/receiver' element={<Receiver />}></Route>
        <Route path='receiver/createReceiver' element={<CreateReceiver />}></Route>
        <Route path='receiver/updateReceiver/:id' element={<UpdateReceiver />}></Route>

        <Route path='/supply' element={<Supply />}></Route>
        <Route path='supply/createSupply' element={<CreateSupply />}></Route>
        <Route path='supply/createSupply/:id' element={<CreateSupply />}></Route>
        <Route path='supply/updateSupply/:id' element={<UpdateSupply />}></Route>
        <Route path='supply/manageSupply/:id' element={<ManageSupply />}></Route>

        <Route path='/' element={<Dashboard />}></Route>

        <Route path='/inventory' element={<Inventory />}></Route>
        <Route path='/threshold' element={<Threshold />}></Route>
        <Route path='/expiration' element={<Expiration />}></Route>
        <Route path='/post_date' element={<PostDate />}></Route>
        <Route path='/notifications' element={<Notifications />}></Route>
        <Route path='/supply_report' element={<SupplyReport />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
    
    </div>
    
  );
}

export default App;
