import './App.css';
import ShowProducts from './components/ShowProducts';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CreateCategory from './components/CreateCategory';
import ShowCategories from './components/ShowCategories';
import ProductDetail from './components/ProductDetail';
import EditCategory from './components/EditCategory';
import ProductForm from './components/ProductForm';  
import Home from  './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">


<BrowserRouter>
<Routes>

<Route path='/products' element={<ShowProducts/>}/>
<Route path="/"  element={<Home/>} />

<Route path='/create' element={<ProductForm />} /> 

<Route path='/edit/:id' element={<ProductForm/>}/>

<Route path='/createCategory' element={<CreateCategory />} />  
<Route path="/product/:id" element={<ProductDetail />} />
<Route path="/editCategory/:id" element={<EditCategory />} />

<Route path="/register" element={<Register/>} />
<Route path="/login" element={<Login/>} />

<Route path="/categories" element={<ShowCategories />} /> 

</Routes>


</BrowserRouter>




    </div>
  );
}

export default App;
