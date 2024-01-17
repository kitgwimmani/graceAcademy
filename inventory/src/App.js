import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import User from './User';
import CreateUser from './CreateUser';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<User />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
