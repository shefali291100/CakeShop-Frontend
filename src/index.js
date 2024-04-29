
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Home from "./component/home/Home";
import Login from './pages/Login'
import Register from './pages/Register';
import ProductList from './component/product/ProductList';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart';
import Checkout from './pages/checkout';
import Order from './pages/order';
import AdminPanel from './pages/AdminPanel';



const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>
          <Route path='' element={<Home/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout/:totalP' element={<Checkout />} />
          <Route path='/order' element={<Order />} />
          <Route path='/adminPanel' element={<AdminPanel />} />
          

      </Route>

  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();