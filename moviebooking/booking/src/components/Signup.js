import React, { useEffect, useState } from 'react';
import "./Signup.css"


function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        cardType:'',
        paymentInfo: '',
        expirationDate:'',
        promoStatus: 'yes' // Default value for promotions
    });
    const handlefn = (event) => {
        setFormData({...formData, firstName: event.target.value})
        // console.log(event.target.value)
    }
    const handleln = (event) => {
        setFormData({...formData, lastName: event.target.value})
        // console.log(event.target.value)
    }
    const handleem = (event) => {
        setFormData({...formData, email: event.target.value})
        // console.log(event.target.value)
    }
    const handlepw = (event) => {
        setFormData({...formData, password: event.target.value})
        // console.log(event.target.value)
    }
    const handlecp = (event) => {
        setFormData({...formData, confirmPassword: event.target.value})
        // console.log(event.target.value)
    }
    const handleadd = (event) => {
        setFormData({...formData, address: event.target.value})
        // console.log(event.target.value)
    }
    const handlect = (event) => {
        setFormData({...formData, cardType: event.target.value})
        // console.log(event.target.value)
    }
    const handlepc = (event) => {
        setFormData({...formData, paymentInfo: event.target.value})
        // console.log(event.target.value)
    }
    const handleed = (event) => {
        setFormData({...formData, expirationDate: event.target.value})
        // console.log(
    }
    const handlest = (event) => {
        setFormData({...formData, promoStatus: event.target.value == "yes" ? 1 : 0})
        // console.log(event.target.value)
    }
    useEffect(() => {
        console.log(formData)
    },[])
    const validatePassword = () => {
        const { password, confirmPassword } = formData;
        console.log("password" + password)
        console.log("confirm    "  + confirmPassword)
        if (password !== confirmPassword) {
            document.getElementById("confirm").setCustomValidity("The passwords do not match.");
        } else {
            document.getElementById("confirm").setCustomValidity("");
            postInfo();
        }
    }

    const postInfo = async () => {
        // const { firstName, lastName, email, password, paymentCard } = formData;
        const options = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(formData) // Convert data to JSON string
        };
        await fetch("http://localhost:8080/postInfo",options)
        .then((response) => console.log(response))
        .catch(err=> console.log(err))
        
    }

    const handleSubmit = (event) => {
        console.log(formData)
        event.preventDefault(); // Prevent default form submission behavior
        validatePassword();
    }

    return (
        <div>

            <div className="container signup-container">
                <div className="card">
                    <div className="card-body" style={{ backgroundColor: '#AEC3B0' }}>
                        <h5 className="card-title">Sign Up</h5>
                        <form id="signupForm" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name<sup> *required</sup></label>
                                <input type="text" className="form-control" id="firstname" name="firstName" onChange={handlefn} required />
                            </div>
                            <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name<sup> *required</sup></label>
                    <input type="text" class="form-control" id="lastname" name="lastname" onChange={handleln}required/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address<sup> *required</sup></label>
                    <input type="email" class="form-control" id="email" name="email" onChange={handleem}required/>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password<sup> *required</sup></label>
                    <input type="text" class="form-control" id="password" name="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={handlepw}/>
                    <small class="form-text text-muted">Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.</small>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Confirm Password<sup> *required</sup></label>
                    <input type="text" class="form-control" id="confirm" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={handlecp}/>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address <sup> (optional)</sup></label>
                    <input type="text" class="form-control" id="address" name="address" onChange={handleadd}/>
                    <small class="form-text text-muted">Example: 123 Movie St.</small>
                </div>
                <div class="mb-3">
                    <label for="cardType" class="form-label">Card Type <sup> (optional)</sup></label>
                    <input type="text" class="form-control" id="cardType" name="paymentcard" onChange={handlect}/>
                </div>
                <div class="mb-3">
                    <label for="paymentcard" class="form-label">Payment Card <sup> (optional)</sup></label>
                    <input type="text" class="form-control" id="paymentcard" name="paymentcard" onChange={handlepc}/>
                </div>
                <div class="mb-3">
                    <label for="expiration_date" class="form-label">Expiration Date <sup> (optional)</sup></label>
                    <input type="date" class="form-control" id="expiration_date" name="paymentcard" minlength="16" maxlength="16" onChange={handleed}/>
                </div>
                <div class="mb-3">
                    <label for="promostatus" class="form-label">Sign Up for Promotions?</label>
                    <select class="form-select" id="promostatus" name="promostatus" onChange={handlest}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>                            
                <button type="submit" className="custom-signup-button btn btn-primary btn-block">Sign Up</button>
                        </form>
                        <p className="mt-3">Already have an account? <a href="Login">Log In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
