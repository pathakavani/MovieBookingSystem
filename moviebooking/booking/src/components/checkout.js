import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css'
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.email);

  useEffect(() => {
    if (isLoggedIn == "") {
      navigate('/login')
    }
  }, [isLoggedIn, navigate]);

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
          {/* Modify the anchor tag to prevent default behavior */}
          <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif', fontFamily: 'Lilita One, cursive' }} href="Main.php" onClick={(e) => handleLogout(e)}>
            <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="logo" /></i> MovieHub
          </a>
        </div>
      </nav>
      <div className="orderbox">
        <div className="orderdetails">
          <p style={{ display: 'inline-block' }}><b>Order Details:</b></p>
          <br />
          <p>Tickets:</p>
          <p>Example Movie (Adult) x 2 - $29.99 <img src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" /></p>
          <br />
          <p>Example Movie (Child) x 1 - $9.99 <img src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" /></p>
          <br />
          <p>Subtotal - 39.98</p>
          <br />
          <p>Tax - $3.20</p>
          <br />
          <p>Total - $43.18</p>
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
