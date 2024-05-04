// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './checkout.css'
// import { useSelector, useDispatch } from 'react-redux';
// import { loginActions } from '../redux/loginSlice';
// import { cartActions } from '../redux/cart';
//
// function OrderPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const isLoggedIn = useSelector((state) => state.login.email);
//   const {
//     movie,
//         date,
//         time,
//         adults,
//         children,
//         senior
//   } = useSelector((state) => state.cart);
//   const [costs, setCosts] = useState({
//     tadults:0,tchildren:0,tsenior:0, sub:0, tax:0, total:0
//   })
//   useEffect(() => {
//     setCosts({...costs,
//       tadults:(adults*14.99),
//       tchildren:(children*9.99),
//       tsenior:(senior*8.99),
//       sub: (adults*14.99 + children*9.99 + senior*8.99),
//       tax: ((adults*14.99 + children*9.99 + senior*8.99)*0.08),
//       total: ((adults*14.99 + children*9.99 + senior*8.99)+((adults*14.99 + children*9.99 + senior*8.99)*0.08))
//     });
//     console.log("costs:", costs)
//   },[])
//
//   useEffect(() => {
//     if (isLoggedIn == "") {
//       navigate('/login')
//     }
//   }, [isLoggedIn, navigate]);
//
//   const decrease = (e) => {
//     const {name} = e.target;
//     var value = 0;
//     switch(name) {
//       case "adult" :{
//         value = adults
//       }
//       case "children" :{
//         value = children
//       }
//       case "senior" :{
//         value = senior
//       }
//     }
//     //dispatch(cartActions.adjust({name: name, amount: (value - 1)}))
//   }
//
//   // Handle logout function without dispatching when navigating back to home page
//   const handleLogout = (event) => {
//     // Prevent default behavior of the anchor tag
//     event.preventDefault();
//     // Dispatch action to logout user
//     dispatch(loginActions.setEmail(""));
//     // Redirect to home page after logout
//     navigate('/');
//   };
//
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg ">
//         <div className="container-fluid">
//           {/* Modify the anchor tag to prevent default behavior
//           <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif', fontFamily: 'Lilita One, cursive' }} href="Main.php" onClick={(e) => handleLogout(e)}>
//             <i><img src="https://i.ibb.co/jy62Srz/36a17f9402f64b66ba11ad785ec9ff3e.png" alt="logo" /></i> MovieHub
//           </a> */}
//         </div>
//       </nav>
//       <div className="orderbox">
//         <div className="orderdetails">
//           <p style={{ display: 'inline-block' }}><b>Order Details:</b></p>
//           <h1><b>{movie}</b></h1>
//           <br/>
//           <p>Tickets:</p>
//           <p>Movie (Adult) x {adults} - ${costs.tadults}
//             {/*<img onClick={decrease} name="adult" src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" />*/}
//           </p>
//           <br />
//           <p>Movie (Child) x {children} - ${costs.tchildren}
//             {/*<img onClick={decrease} name="children" src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" />*/}
//           </p>
//           <br />
//           <p>Movie (Seniors) x {children} - ${costs.tsenior}
//             {/*<img onClick={decrease} name="senior" src="https://icons.veryicon.com/png/o/miscellaneous/jt2/box-minus-1.png" alt="minus button" width="25px" />*/}
//           </p>
//           <br />
//           <p>Subtotal - ${costs.sub}</p>
//           <br />
//           <p>Tax - ${costs.tax.toFixed(2)}</p>
//           <br />
//           <p>Total - ${costs.total.toFixed(2)}</p>
//         </div>
//         <div className="rightbox">
//           <div className="paymentmethodsgrid">
//             <button className='paymentmethod'>Existing Payment Info</button>
//             {/*implement onclick over here*/}
//             {/*<div className="paymentmethod">*/}
//             {/*  <p>MasterCard *2147</p>*/}
//             {/*</div>*/}
//             {/*<div className="paymentmethod">*/}
//             {/*  <p>Visa *3239</p>*/}
//             {/*</div>*/}
//             {/*<div className="paymentmethod">*/}
//             {/*  <p>Amex *1907</p>*/}
//             {/*</div>*/}
//             {/*<button className='paymentmethod'>Payment Method</button>*/}
//             {/*<a href='payment'>Payment Method</a>*/}
//             <button className='paymentmethod' onClick={handlePaymentMethodClick}>Payment Method</button>
//
//             {showPaymentForm && (
//                 // <form id="paymentForm" onSubmit={handleSubmit}>
//                 //   {/* Payment details form */}
//                 // </
//                 <form id="paymentForm" onSubmit={handleSubmit}>
//                   <h2>Payment Details</h2>
//
//                   <div className="form-group">
//                     <label htmlFor="cardName">Name on Card</label>
//                     <input type="text" id="cardName" name="cardName" placeholder="First Name" required/>
//                   </div>
//
//                   <div className="form-group">
//                     <label htmlFor="cardNumber">Card Number</label>
//                     <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456"
//                            pattern="\d{16}" required/>
//                   </div>
//
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="cardExpiry">Expiry Date</label>
//                       <input type="text" id="cardExpiry" name="cardExpiry" placeholder="MM/YY" pattern="\d{2}/\d{2}"
//                              required/>
//                     </div>
//
//                     <div className="form-group">
//                       <label htmlFor="cardCVC">CVC</label>
//                       <input type="text" id="cardCVC" name="cardCVC" placeholder="CVC" pattern="\d{3}" required/>
//                     </div>
//                   </div>
//
//                   <div className="form-group">
//                     <input type="checkbox" id="saveCard" name="saveCard"/>
//                     <label htmlFor="saveCard">Save this card for future payments</label>
//                   </div>
//
//                   <button type="submit">Submit Payment</button>
//                 </form>
//             )}
//           </div>
//           <form>
//             <label htmlFor="promo" style={{marginTop: '70px'}}>Promo Code</label>
//             <input type="text" id="promo" name="promo" placeholder="Enter your promo code here..."/>
//           </form>
//           <div className="confirmcancelbuttons">
//             <button
//                 style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}
//                 onClick={(e) => handleLogout(e)}>Previous
//             </button>
//             <button
//                 style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}
//                 onClick={(e) => handleLogout(e)}>Cancel
//             </button>
//             <button style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px'}}><a
//                 href="ConfirmationPage">Confirm Order</a></button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default OrderPage;

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
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            {/* Modify the anchor tag to prevent default behavior */}
            {/* <a className="navbar-brand active" style={{ color: 'white', fontFamily: 'Lato, sans-serif', fontFamily: 'Lilita One, cursive' }} href="Main.php" onClick={(e) => handleLogout(e)}>
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
            <p>Movie (Adult) x {adults} - ${costs.tadults}</p>
            <br />
            <p>Movie (Child) x {children} - ${costs.tchildren}</p>
            <br />
            <p>Movie (Seniors) x {children} - ${costs.tsenior}</p>
            <br />
            <p>Subtotal - ${costs.sub}</p>
            <br />
            <p>Tax - ${costs.tax.toFixed(2)}</p>
            <br />
            <p>Total - ${costs.total.toFixed(2)}</p>
          </div>
          <div className="rightbox">
            <div className="paymentmethodsgrid">
              <button className='paymentmethod'>Existing Payment Info</button>
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
                        <input type="text" id="cardExpiry" name="cardExpiry" placeholder="Expiry Date(MM/YY)" pattern="\d{2}/\d{2}"
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
            <div>
            <button  onClick={togglePromoForm}>Apply Promo</button>
            {showPromoForm && (
                <form>
                  <label htmlFor="promo" style={{marginTop: '70px'}}>Promo Code</label>
                  <input type="text" id="promo" name="promo" placeholder="Enter your promo code here..."/>
                  <button>Apply</button>
                {/*  implement on click*/}
                </form>
            )}
            </div>
            {/*<form>*/}
            {/*  <label htmlFor="promo" style={{marginTop: '70px'}}>Promo Code</label>*/}
            {/*  <input type="text" id="promo" name="promo" placeholder="Enter your promo code here..."/>*/}
            {/*</form>*/}
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
        </div>
      </div>
  );
}

export default OrderPage;
