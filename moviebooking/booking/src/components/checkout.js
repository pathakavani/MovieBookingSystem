import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css'
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    // Dispatch action to logout user
    dispatch(loginActions.setLoggedIn(false));
    // Redirect to home page after logout
    navigate('/');
  };

  const handleCheckout = () => {
    // Redirect to checkout page
    navigate('/checkout');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif', fontFamily: 'Lilita One, cursive' }} href="Main.php">
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
            {/* <div className="paymentmethod"> */}
              {/* <p>Add Payment Method</p> */}
              <button className='paymentmethod'><a href='payment'>Payment Method</a></button>
            {/* </div> */}
          </div>
         
          <form>
                {/* <label for="promo" style="margin-top: 50px;">Promo Code</label> */}
                <label htmlFor="promo" style={{ marginTop: '70px' }}>Promo Code</label>

                <input type="text" id="promo" name="promo" placeholder="Enter your promo code here..."/>
            </form>
          <div className="confirmcancelbuttons">
            <button style={{ backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px' }}><a href="seatBooking">Previous</a></button>
            <button style={{ backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px' }}><a href="Main.php">Cancel</a></button>
            <button style={{ backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px' }}><a href="ConfirmationPage">Confirm Order</a></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
