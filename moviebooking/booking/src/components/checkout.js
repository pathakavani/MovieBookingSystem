import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css'
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';
import { cartActions } from '../redux/cart';

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.email);
  const {
    movie,
        date,
        time,
        adults,
        children,
        senior
  } = useSelector((state) => state.cart);
  const [costs, setCosts] = useState({
    tadults:0,tchildren:0,tsenior:0, sub:0, tax:0, total:0
  })
  useEffect(() => {
    setCosts({...costs,
      tadults:(adults*14.99),
      tchildren:(children*9.99),
      tsenior:(senior*8.99),
      sub: (adults*14.99 + children*9.99 + senior*8.99),
      tax: ((adults*14.99 + children*9.99 + senior*8.99)*0.08),
      total: ((adults*14.99 + children*9.99 + senior*8.99)+((adults*14.99 + children*9.99 + senior*8.99)*0.08))
    });
    console.log("costs:", costs)
  },[])

  useEffect(() => {
    if (isLoggedIn == "") {
      navigate('/login')
    }
  }, [isLoggedIn, navigate]);

  const decrease = (e) => {
    const {name} = e.target;
    var value = 0;
    switch(name) {
      case "adult" :{
        value = adults
      }
      case "children" :{
        value = children
      }
      case "senior" :{
        value = senior
      }
    }
    //dispatch(cartActions.adjust({name: name, amount: (value - 1)}))
  }

  // Handle logout function without dispatching when navigating back to home page
  const handleLogout = (event) => {
    // Prevent default behavior of the anchor tag
    event.preventDefault();
    // Dispatch action to logout user
    dispatch(loginActions.setEmail(""));
    // Redirect to home page after logout
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          {/* Modify the anchor tag to prevent default behavior
          <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif', fontFamily: 'Lilita One, cursive' }} href="Main.php" onClick={(e) => handleLogout(e)}>
            <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="logo" /></i> MovieHub
          </a> */}
        </div>
      </nav>
      <div className="orderbox">
        <div className="orderdetails">
          <p style={{ display: 'inline-block' }}><b>Order Details:</b></p>
          <h1><b>{movie}</b></h1>
          <br/>
          <p>Tickets:</p>
          <p>Movie (Adult) x {adults} - ${costs.tadults} <img onClick={decrease} name="adult" src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" /></p>
          <br />
          <p>Movie (Child) x {children} - ${costs.tchildren} <img onClick={decrease} name="children" src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" /></p>
          <br />
          <p>Movie (Seniors) x {children} - ${costs.tsenior} <img onClick={decrease} name="senior" src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" /></p>
          <br />
          <p>Subtotal - ${costs.sub}</p>
          <br />
          <p>Tax - ${costs.tax.toFixed(2)}</p>
          <br />
          <p>Total - ${costs.total.toFixed(2)}</p>
        </div>
        <div className="rightbox">
          <div className="paymentmethodsgrid">
            <div className="paymentmethod">
              <p>MasterCard *2147</p>
            </div>
            <div className="paymentmethod">
              <p>Visa *3239</p>
            </div>
            <div className="paymentmethod">
              <p>Amex *1907</p>
            </div>
            <button className='paymentmethod'><a href='payment'>Payment Method</a></button>
          </div>
          <form>
            <label htmlFor="promo" style={{ marginTop: '70px' }}>Promo Code</label>
            <input type="text" id="promo" name="promo" placeholder="Enter your promo code here..."/>
          </form>
          <div className="confirmcancelbuttons">
            <button style={{ backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px' }} onClick={(e) => handleLogout(e)}>Previous</button>
            <button style={{ backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px' }} onClick={(e) => handleLogout(e)}>Cancel</button>
            <button style={{ backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px' }}><a href="ConfirmationPage">Confirm Order</a></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
