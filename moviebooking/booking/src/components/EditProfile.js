import React, { useEffect, useState } from 'react';
import axios from 'axios';
function EditProfile() {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        paymentMethod: 'credit',
        paymentInfo: '',
        promotion:'0',
        billingAddress: ''
    });
    const [data, setData] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/getInfo")
            .then(data => {
                setData(data.data);
            })
            .catch(error => console.error('Error fetching profile data:', error));
    }, []);
    useEffect(() => {
        var splitted = data.split(", ");
        console.log(splitted);
        setProfile({
            firstName: data.split(", ")[0],
            lastName: data.split(", ")[1],
        email: data.split(", ")[2],
        password: data.split(", ")[3],
        paymentMethod: data.split(", ")[4],
        paymentInfo: data.split(", ")[5],
        billingAddress: data.split(", ")[7]
        })
    }, [data])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, send profile data to server
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1>Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={profile.firstName} onChange={handleInputChange} placeholder="Your First Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={profile.lastName} onChange={handleInputChange} placeholder="Your Last Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={profile.email} placeholder="Your Email" readOnly/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={profile.password} onChange={handleInputChange} placeholder="New Password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                            <select className="form-select" id="paymentMethod" name="paymentMethod" value={profile.paymentMethod} onChange={handleInputChange}>
                                <option value="credit">Credit Card</option>
                                <option value="debit">Debit Card</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentInfo" className="form-label">Payment Information</label>
                            <input type="text" className="form-control" id="paymentInfo" name="paymentInfo" value={profile.paymentInfo} onChange={handleInputChange} placeholder="Payment Information" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                            <input type="text" className="form-control" id="billingAddress" name="billingAddress" value={profile.billingAddress} onChange={handleInputChange} placeholder="Billing Address" />
                        </div>
                        <div style={{display: 'flex'}}>
                            <label htmlFor="promotions" className="form-label">Promotions?</label>
                            <input type="checkbox" className="form-control" id="promotions" name="promotions" value={profile.promotion} onChange={handleInputChange} checked/>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
