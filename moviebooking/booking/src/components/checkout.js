import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';
import { cartActions } from '../redux/cart';

function OrderPage() {
  const {user,email} = useSelector((state) => state.login)
  const [cards, setCards] = useState([{
    cardType:"",
    cardNumber:"",
    expirationDate:""
  }])
  const [showCards, setShowCards] = useState(false);
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

  useEffect(() => {
    fetch("http://localhost:8080/getUserID?email="+email)
    .then((response) => response.json())
    .then((data) => dispatch(loginActions.setId(data)))
    .catch(err => console.log(err))
    console.log("user: " + user)
  }, [costs])

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

  const getUsersCards = () =>{
    setShowCards(!showCards);
    var tempCard = [{
      cardType:"",
      cardNumber:"",
      expirationDate:""
    }]
    fetch("http://localhost:8080/getCards")
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      data.map((item) => {
          tempCard.push({
            cardType:item.split("\t")[0],
        cardNumber:item.split("\t")[1],
        expirationDate:item.split("\t")[2]
          })
      })
      if (cards !== tempCard)
        setCards(tempCard)  
    })
  }

  return (
      <div>
        <div className="orderbox">
          <div className="orderdetails">
            <p style={{display: 'inline-block'}}><b>Order Details:</b></p>
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
            <div className="manage-promotions">
              {/*className="manage-promotions-container"*/}
              <button onClick={togglePromoForm}>Apply Promo</button>
              {showPromoForm && (
                  <form>
                    <label htmlFor="promo" style={{marginTop: '50px'}}>Promo Code</label>
                    <input type="text" id="promo" name="promo" placeholder="Enter your promo code here..."/>
                    <button>Apply</button>
                    {/*  implement on click*/}
                  </form>
              )}
            </div>
            <div className="paymentmethodsgrid">
              <div className='space'>
              <button className='paymentmethod' onClick={getUsersCards}>Existing Payment Info</button>
              {showCards &&
                cards.map((card) => 
                {if (card.cardNumber!=="") return(
                  <div className='cards'>
                    <h3 >{card.cardType}</h3>
                    <p>{card.cardNumber}</p>
                    <p><i>{card.expirationDate}</i></p>
                    </div>
                )})
              }
              </div>
              <div className='space'>
              <button className='paymentmethod' onClick={togglePaymentForm}>Payment Method</button>
              {/* Add Apply Promo button */}
              {showPaymentForm && (
                  // <form id="paymentForm" onSubmit={handleSubmit}>
                  //   {/* Payment details form */}
                  // </
                  <div className='paymentform'>
                    <form id="paymentForm" onSubmit={handleSubmit}>
                      <h2>Payment Details</h2>

                      <div className="form-group">
                        {/*<label htmlFor="cardName">Name on Card</label>*/}
                        <input type="text" id="cardName" name="cardName" placeholder="Name on Card" required/>
                      </div>

                      <div className="form-group">
                        {/*<label htmlFor="cardNumber">Card Number</label>*/}
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number"
                               pattern="\d{16}" required/>
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
                          <input type="text" id="cardCVC" name="cardCVC" placeholder="CVC" pattern="\d{3}" required/>
                        </div>
                      </div>

                      <div className="form-group">
                        <input type="checkbox" id="saveCard" name="saveCard"/>
                        <label htmlFor="saveCard">Save this card for future payments</label>
                      </div>

                      <button type="submit">Submit Payment</button>
                    </form>
                  </div>
              )}
              </div>
            </div>

            {/*<form>*/}
            {/*  <label htmlFor="promo" style={{marginTop: '70px'}}>Promo Code</label>*/}
            {/*  <input type="text" id="promo" name="promo" placeholder="Enter your promo code here..."/>*/}
            {/*</form>*/}

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
          <button style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px'}}><a
              href="ConfirmationPage">Confirm Order</a></button>
        </div>
      </div>
  );
}

export default OrderPage;
