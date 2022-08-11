import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Success from './pages/Success';
import { useSelector } from 'react-redux';

/*
function App() {

    const user = useSelector((state) => state.user.currentUser);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} replace={true}/>
                <Route path="/products/:category" element={<ProductList/>} replace={true}/>
                <Route path="/product/:id" element={<Product/>} replace={true}/>
                <Route path="/cart" element={<Cart/>} replace={true}/>
                <Route path="/success" element={<Success/>} replace={true}/>
                <Route path="/login" element={user ? <Navigate to="/"  replace={true}/> : <Login/>}/>
                <Route path="/register" element={user ? <Navigate to="/" replace={true}/> : <Register/>}/>
            </Routes>
        </Router>
    );
}
*/


const App = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:category">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    );
  };


export default App;