import React from 'react'
import background from "../../assets/images/bg8.jpg";
import {NavLink, useNavigate} from 'react-router-dom'



export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="hero">
            <div className="card text-bg-dark text-white border-0">
                <img src={background} className="card-img" alt="Background" height="550px" />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">DELICIOUS CAKES</h5>
                        <p className="card-text lead fs-2">Making your life sweeter <br/> one bite at a time!</p>
                        <button type="button" class="btn btn-light" onClick={()=>navigate('/products')}>Discover Our Products</button>
                    </div>

                </div>
            </div>
           
        </div>
    );
}
