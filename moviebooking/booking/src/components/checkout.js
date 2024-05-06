import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';
import { cartActions } from '../redux/cart';

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPromoForm, setShowPromoForm] = useState(false); // Define showPromoForm state variable
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
    tadults:0, tchildren:0, tsenior:0, sub:0, tax:0, total:0
  });

  useEffect(() => {
    setCosts({
      ...costs,
      tadults:(adults*14.99),
      tchildren:(children*9.99),
      tsenior:(senior*8.99),
      sub: (adults*14.99 + children*9.99 + senior*8.99),
      tax: ((adults*14.99 + children*9.99 + senior*8.99)*0.08),
      total: ((adults*14.99 + children*9.99 + senior*8.99)+((adults*14.99 + children*9.99 + senior*8.99)*0.08))
    });
  },[]);

  useEffect(() => {
    if (isLoggedIn === "") {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const togglePaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
  };

  const togglePromoForm = () => {
    setShowPromoForm(!showPromoForm);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(loginActions.setEmail(""));
    navigate('/');
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to server
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('handle data');
    // Handle form submission here, e.g., send data to server
  };

  return (
      <div>
          <div className="manage-promotions">
            <form>
            <label htmlFor="promo">Promo Code</label>
            <input type="text" id="promo" name="promo" placeholder="Enter promo code"/>
            <button>Apply</button>
            </form>
          </div>
        <div className="orderbox">
          <div className="orderdetails">
            <p><b>Order Details:</b></p>
            <h1><b>{movie}</b></h1>
            <br/>
            <p>Tickets:</p>
            <p>Movie (Adult) x {adults} - ${costs.tadults}</p>
            <br/>
            <p>Movie (Child) x {children} - ${costs.tchildren}</p>
            <br/>
            <p>Movie (Seniors) x {children} - ${costs.tsenior}</p>
            <br/>
            <p>Subtotal - ${costs.sub}</p>
            <br/>
            <p>Tax - ${costs.tax.toFixed(2)}</p>
            <br/>
            <p>Total - ${costs.total.toFixed(2)}</p>
          </div>
          <div className="rightbox">
            <div className="paymentmethodsgrid">
                  <div className='paymentform'>
                    <form id="paymentForm" onSubmit={handleSubmit}>
                      <h2>Payment Details</h2>
                      <div className="form-group">
                        <input type="text" id="cardName" name="cardName" placeholder="Name on Card" required/>
                      </div>
                      <div className="form-group">
                        {/*<label htmlFor="cardNumber">Card Number</label>*/}
                        <input type="password" id="cardNumber" name="cardNumber" placeholder="Card Number"
                               pattern="\d{16}" required
                               style={{ width: "100%" }}/>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          {/*<label htmlFor="cardExpiry">Expiry Date</label>*/}
                          <input type="text" id="cardExpiry" name="cardExpiry" placeholder="Expiry Date(MM/YY)"
                                 pattern="\d{2}/\d{2}"
                                 required/>
                        </div>

                        <div className="form-group">
                          {/*<label htmlFor="cardCVC">CVC</label>*/}
                          <input type="password" id="cardCVC" name="cardCVC" placeholder="CVC" pattern="\d{3}" required style={{ width: "100%" }}/>
                        </div>
                      </div>

                      <div className="form-group">
                        <input type="checkbox" id="saveCard" name="saveCard"/>
                        <label htmlFor="saveCard">Save this card for future payments</label>
                      </div>

                      <button type="submit">Submit Payment</button>
                    </form>
                  </div>
                  <button className='paymentmethod'>Existing Payment Info</button>
            </div>
          </div>
        </div>
        <div className="confirmcancelbuttons">
          <button
              style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}
              onClick={(e) => handleLogout(e)}>Previous
          </button>
          <button
              style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}
              onClick={(e) => handleLogout(e)}>Cancel
          </button>
          <button style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}><a
              href="ConfirmationPage">Confirm Order</a></button>
        </div>
      </div>
  );
}

export default OrderPage;