
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom'

function Cart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cartIsEmpty, setCartIsEmpty] = useState('');
  const [totalP, setTotalP] = useState()
  const [products, setProducts] = useState([]);
  const[Value,setValue] = useState(1);

  const getProductFromLocalStore = () => {   // fetch local store data which present in localstore
    const product = [];
    var total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      if (key !== "loginInfo") {
        const arr = key.split("_");
        const data = JSON.parse(value)
        total += data.productQuantity * data.productPrice;
        if (arr[0] === "cartDetails") {
          product.push(JSON.parse(value));
        }
      }
    }

    setProducts(product);
    setTotalP(total);
  }
  const navigate = useNavigate()
  const removeProductInLocalStore = (productId) => {  // This method use for remove product from Local Store
    const key = "cartDetails" + "_" + productId.toString();
    localStorage.removeItem(key);
    //toast removed
  }

  const editProductQuantityInLocalStore = (productId, sign) => {  // This method use for change quantity in Local store
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const keyToCheck = "cartDetails" + "_" + productId.toString();
      if (keyToCheck === key) {
        const data = JSON.parse(localStorage.getItem(key))
        if (sign === "-") {
          data.productQuantity = Number(data.productQuantity) - 1;
          if (data.productQuantity == 0) {
            removeProductInLocalStore(productId);
          } else {
            localStorage.setItem(key, JSON.stringify(data))
          }
        } else {
          data.productQuantity = Number(data.productQuantity) + 1;
          if (data.productQuantity > 5) {
            alert("Maximum 5 quantity allowed!")
          } else {
            localStorage.setItem(key, JSON.stringify(data))
          }
        }
        getProductFromLocalStore()
      }
    }
  }

  const clearCart = () => {
    var loginInfo = localStorage.getItem("loginInfo");
    localStorage.clear();
    localStorage.setItem("loginInfo", loginInfo);
    setCartIsEmpty(true);
  }

  const CartRemove = () => {
    setShow(false);
    clearCart();
    navigate(`/Checkout/${totalP}`);
  }
  

  useEffect(() => {
    getProductFromLocalStore()
  }, [Value])

  const handleUpdatecart =()=>{
    // alert("clicked"+Date())
    // setDummyValue( Date())
    if(Value ===1){
      setValue(0);
    }else{
      setValue(1);
    }
  }

  useEffect(() => {
    (async () => {
      const result = localStorage.length;
      if (result > 1) {
        setCartIsEmpty(false);
      } else {
        setCartIsEmpty(true);
      }
    })();
  }, [cartIsEmpty,Value]);


  return (
    <>
      <div className="fa fa-shopping-cart me-1"onClick={()=>{handleUpdatecart();handleShow()}} >
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        {!cartIsEmpty ? (
          <>
            <Modal.Body>
              {products.map((item) => (
                <div class="row">
                  <div class="col-3">

                    <img style={{ height: '60px', width: '60px', overflow: 'hidden', borderRadius: '20px' }} src={item.productImg} />
                  </div>
                  <div class="col-6">
                    <p><strong>{item.productName}</strong></p>
                    <p style={{ marginTop: '20px' }}>₹<span id="pricec">{item.productPrice}</span></p>

                  </div>
                  <div class="col-3">

                    <span><button data-id="+" class=" updatec btn btn-outline-danger btn-sm" onClick={() => editProductQuantityInLocalStore(item.productId, "-")}>-</button></span>
                    <span id="mquantity" class="ml-1 mr-1"><b> {item.productQuantity} </b></span>
                    <span><button data-id="-" class=" updatec btn btn-outline-danger btn-sm " onClick={() => editProductQuantityInLocalStore(item.productId, "+")}>+</button></span>

                    <p><span id="amount'.$row['cake_id'].'">₹{item.productPrice * item.productQuantity}</span></p>
                  </div>

                </div>
              ))}

            </Modal.Body>
            <Modal.Footer>
              <div class="row">
                <div class="col-5">
                  <h5> Subtotal: ₹<span id="total">{totalP}</span></h5>
                </div>
                <div class="col-4">
                  <p
                    class="btn btn-outline-dark" onClick={clearCart}> Clear Cart</p>
                </div>
                <div class="col-3">
                  <button id="checkout-btn" class="btn btn-dark" onClick={CartRemove}>Checkout</button>
                </div>
              </div>
            </Modal.Footer>

          </>

        ) : (
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} class="text-danger">Cart is empty.</p>
        )}

      </Modal>
    </>
  )
}

export default Cart


