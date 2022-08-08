import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {

    const user = true;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} replace={true}/>
                <Route path="/products/:category" element={<ProductList/>} replace={true}/>
                <Route path="/product/:id" element={<Product/>} replace={true}/>
                <Route path="/cart" element={<Cart/>} replace={true}/>
                <Route path="/login" element={user ? <Navigate to="/"  replace={true}/> : <Login/>}/>
                <Route path="/register" element={user ? <Navigate to="/" replace={true}/> : <Register/>}/>
            </Routes>
        </Router>
    );
}


export default App;