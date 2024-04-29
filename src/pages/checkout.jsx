import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow, MDBTextArea, MDBTypography } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import addressService from '../services/address.service';
import { useParams } from 'react-router-dom';
import { OrderService } from '../services/order.service';
import orderService from '../services/order.service';
import orderDetailService from '../services/orderdetail.service';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './checkout.css';


export default function Checkout() {
    const navigate = useNavigate();

    const [city, setcity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setpincode] = useState('');
    const [streetAddress, setstreetAddress] = useState('');
    const [landmark, setlandmark] = useState('');

   // const [isActive, setIsActive] = useState(false);


    const { totalP } = useParams();
    const handlecityChange = (value) => {
        setcity(value);
    }
    const handleStateChange = (value) => {
        setState(value);
    }
    const handlePincodeChange = (value) => {
        setpincode(value);
    }
    const handleStreetAddressChange = (value) => {
        setstreetAddress(value);
    }
    const handleLandmarkChange = (value) => {
        setlandmark(value);
    }
    var addressId = 2
    var orderDate = new Date().toISOString()
    var orderStatus = true
    const handelSubmit = async () => {
        const customerId = JSON.parse(localStorage.getItem("loginInfo")).id;
        var addressresult = await addressService.PostAddress({ customerId, city, state, pincode, streetAddress, landmark })
        const orderData = {
            userId: customerId,
            totalAmount: totalP,
            addressId: addressId,
            orderDate: orderDate,
            orderStatus: orderStatus
        }

        var orderResult = orderService.PostOrder(orderData);


        var loginInfo = localStorage.getItem('loginInfo');
        localStorage.clear();
        localStorage.setItem("loginInfo", loginInfo)
        toast.success("Order Placed Successfully");
        navigate('/');
    }

    return (
        <>
            <div className="mx-auto mt-5" style={{ maxWidth: '900px' }}>
                <MDBRow>
                    <MDBCol md="8" className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">Address details</MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <form>
                                    <MDBRow className="mb-4">
                                        <MDBCol>
                                            <MDBInput label='City' onChange={(e) => handlecityChange(e.target.value)} type='text' />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput label='State' onChange={(e) => handleStateChange(e.target.value)} type='text' />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput label='Pincode' onChange={(e) => handlePincodeChange(e.target.value)} type='number' />
                                        </MDBCol>
                                        <MDBInput label='Street Address' onChange={(e) => handleStreetAddressChange(e.target.value)} type='text' />
                                        <MDBInput label='Landmark' onChange={(e) => handleLandmarkChange(e.target.value)} type='text' />
                                    </MDBRow>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">Summary</MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup flush>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Products
                                        <span>₹{totalP}</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                        Shipping
                                        <span>₹60</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(Including Delivery)</p>
                                            </strong>
                                        </div>
                                        <span><strong>₹{Number(totalP) + 60}</strong></span>
                                    </MDBListGroupItem>
                                </MDBListGroup>

                                <MDBBtn className="black-button" size="lg" onClick={handelSubmit} block>
                                    Place order
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </>
    );
}


