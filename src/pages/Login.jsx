import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'; 
import { LoginService } from '../services/login.service';
import loginService from '../services/login.service';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';


function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(isLoggedIn)
    if(isLoggedIn){
      toast.error("Logout first user");
      return
    }
    if(!email && !password){
      toast.error("Please enter valid User and Password");
      return
    }
    await loginService.login({email, password})
    .then((res)=>{
      setIsLoggedIn(true) // set isLoggedIn to true
      saveDataLocaly(res)
      if(res.isAdmin === false){
        navigate("/")
      } else{
        navigate('/AdminPanel')
      }
       //window.location.reload();
      
    })
    .catch((error)=>{
      toast.error(error.message)
    });
  };
  function saveDataLocaly(data){
    const result = localStorage.getItem('loginInfo')
    if (result === null) localStorage.setItem("loginInfo", JSON.stringify(data))
  }
  

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50" >
      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email}
        onChange={(event) => setEmail(event.target.value)} />
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password}
        onChange={(event) => setPassword(event.target.value)} />
      <MDBBtn className="mb-4" onClick={handleSubmit} >Login</MDBBtn>
      <div className="text-center">
        <p>Not a member? <a href="#!" onClick={() => navigate('/register')}>Register</a></p>
      </div>
    </MDBContainer>
  );
}

export default Login;
