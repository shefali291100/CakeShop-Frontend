import React, { useState } from 'react'
import registerService from '../services/register.service'
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
}
    from 'mdb-react-ui-kit';


export default function Register() {
    var navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setphoneNo] = useState('');
    const [email, setemail] = useState('');
    const [passwordHash, setpassword] = useState('');

    const handelSubmit = async () => {
        var result = await registerService.PostCustomerForRegister({ firstName, lastName, phoneNo, email, passwordHash })
        saveDataLocaly(result);
        navigate("/")
    }
    function saveDataLocaly(data) {
        const result = localStorage.getItem('loginInfo')
        if (result === null) localStorage.setItem("loginInfo", JSON.stringify(data))
    }


    return (

        <MDBContainer className="p-3 my-5  flex-column w-50" >
            <div className='mb-4'>
                <label htmlFor='form1'>First name</label>
                <MDBInput id='form1' type='first name' value={firstName}
                    onChange={(event) => setFirstName(event.target.value)} />
            </div>
            <div className='mb-4'>
                <label htmlFor='form2'>Last name</label>
                <MDBInput id='form2' type='last name' value={lastName}
                    onChange={(event) => setLastName(event.target.value)} />
            </div>
            <div className='mb-4'>
                <label htmlFor='form3'>Phone number</label>
                <MDBInput id='form3' type='phone number' value={phoneNo}
                    onChange={(event) => setphoneNo(event.target.value)} />
            </div>
            <div className='mb-4'>
                <label htmlFor='form4'>Email address</label>
                <MDBInput id='form4' type='email' value={email}
                    onChange={(event) => setemail(event.target.value)} />
            </div>
            <div className='mb-4'>
                <label htmlFor='form6'>Password</label>
                <MDBInput id='form6' type='password' value={passwordHash}
                    onChange={(event) => setpassword(event.target.value)} />
            </div>

            <MDBBtn className="mb-4" onClick={handelSubmit} >Register</MDBBtn>
        </MDBContainer>

    );
}
