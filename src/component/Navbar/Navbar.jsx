import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Login from '../../pages/Login';
import { toast } from 'react-toastify';
import Cart from '../../pages/Cart';


export default function Navbar() {
  const navigate = useNavigate()

  const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
  const [Value, setValue] = useState(1);
  var isAdmin;
  const loginInfo = localStorage.getItem('loginInfo');
  if (loginInfo) {
    const loginInfoJSON = JSON.parse(loginInfo);
    isAdmin = loginInfoJSON.isAdmin;
    // alert(isAdmin)
  }
  useEffect(() => {
    (async () => {
      const result = localStorage.getItem('loginInfo');
      if (result) {
        setnavbarUserIsLogged(true);
      } else {
        setnavbarUserIsLogged(false);
      }
    })();
  }, [navbarUserIsLogged, Value]);

  const handleLogout = async () => {
    localStorage.clear();
    toast.success("Logged Out Successfully");
    setnavbarUserIsLogged(false);
  }

  const handleUpdateNav = () => {
    if (Value === 1) {
      setValue(0);
    } else {
      setValue(1);
    }
  }
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" onClick={handleUpdateNav}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="#">SHEF'S CAKES</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href='#' aria-current="page" onClick={() => navigate('/')}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => navigate('/products')}>Explore cakes</a>
              </li>
              {navbarUserIsLogged ? (
                <><li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => navigate('/order')}>Orders</a>
                </li>
                  {isAdmin ? (
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={() => navigate('/adminPanel')}>Admin</a>
                    </li>
                  ) : (
                    <p></p>
                  )
                  }
                </>

              ) : (
                <a onClick={() => navigate('/login')}></a>
              )}
            </ul>
            <div className="buttons">
              <button className="btn">
                {!navbarUserIsLogged ? (
                  <div>
                    <a onClick={() => navigate('/login')} className="btn btn-outline-dark">
                      <div className="fa fa-sign-in me-1"></div> Login</a>
                    <a onClick={() => navigate('/register')} className="btn btn-outline-dark ms-2">
                      <div className="fa fa-user-plus me-1"></div> Register</a>
                  </div>

                ) : (
                  <><a className='btn btn-outline-dark ms-2' onClick={handleLogout}><div className='fa fa-sign-out'></div> Logout</a>
                    <p className="btn btn-outline-dark ms-3 mt-3"><Cart />
                    </p></>
                )}


              </button>
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}
