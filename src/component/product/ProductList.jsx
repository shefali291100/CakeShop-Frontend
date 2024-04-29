import React, { useEffect, useState } from 'react';
import cakeService from '../../services/cake.service';
import './ProductList.css';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


function ProductList() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {

    cakeService.fetchCakes().then(data => {
      setCakes(data);
    });
  }, []);

  const addToCart = async (id,name,price,imageURL) => {
    const key = "cartDetails"+"_"+id;
    const data = {
      productId: id,
      productQuantity: 1,
      productName: name,
      productPrice: price,
      productImg : imageURL
    }
    localStorage.setItem(key, JSON.stringify(data))
    toast.success("Added to cart !");  // TODO: use toaster message that add successfully
    
}
  //const navigate = useNavigate()
  return (
    <div className="row">
      {cakes.map(item => (
        <div key={item.id} className="col-md-4 mb-4">
          <div className="card">
            <img src={item.imageURL} className="card-img-top" alt={item.name} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <div className="mt-auto">
                <span className='card-bottom'>
                  <a href="#" className="btn btn-outline-dark" onClick={()=>addToCart(item.id,item.name,item.price,item.imageURL)}>
                    Add to cart
                  </a>
                  <h6 className='card-price'>₹{item.price}</h6>
                </span>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
