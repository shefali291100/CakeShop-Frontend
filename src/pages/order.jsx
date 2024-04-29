
import React, { useEffect, useState } from 'react';
import orderService from '../services/order.service';
import { toast } from 'react-toastify';




function Order() {

    const [order, setOrder] = useState([])
    const [products, setProduct] = useState([])

    const handelDate = (d) => {
        let date = new Date(d);
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }


    const userId = JSON.parse(localStorage.getItem("loginInfo")).id
    const getOrders = async () => {
        await orderService.GetOrderByUserId(userId)
            .then((res) => {
                setOrder(res);
                
            })
            .catch((error) => {
                toast.error(error.message)
            });
    }

    useEffect(() => {
        getOrders()
    }, [])


    return (
        <><h1 className='text-center text-xl font-medium'>My Orders</h1>
            {order.map((order) => (
            <>
            <div class="container">
                    <div class="row justify-content-center"> {/* Centers the row */}
                        <div class="col-6"> {/* Adjusts the width of the column */}
                            <div class="card mb-3">
                                <div class="card-body text-left"> {/* Aligns everything to the left */}
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Order ID - <span><b>{order.id}</b></span></p>
                                            <span style={{ float: 'right' }}>Date - <b>{handelDate(order.orderDate)}</b></span>
                                        </div>
                                        <hr />
                                        <div class="col-12">
                                            <a>Paid Amount Rs {order.totalAmount}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>
             
    ))}
</>       

      
    );
}

export default Order;








