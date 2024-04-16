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
        billingAddress: '',
        phoneNumber: ''
    });
    const [data, setData] = useState("");
    //password
    const [wrong, setWrong] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:8080/getInfo")
            .then(response => {
                const data = response.data;
                setProfile(prevState => ({
                    ...prevState,
                    ...data,
                    promotion: data.promotion === '1', // Assuming '1' is true
                }));
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
        billingAddress: data.split(", ")[7],
        phoneNumber: data.split(", ")[9],
        })
    }, [data])

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        //password changed and previous password is the same password for confirmation purposes
        if (name === "npassword" && value !== profile.password ) {
            if (document.getElementById("password").value === data.split(", ")[3]) {
                setProfile({ ...profile, password: value });
                console.log("profile.password: ", profile.password)
            }
            else {
                setWrong(true)
            }
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //for comparison if data changed
        var profileString = profile.firstName +", " +
        profile.lastName +", " +
        profile.email +", " +
        profile.password +", " +
        profile.paymentMethod +", " + 
        profile.paymentInfo +", " + 
        profile.billingAddress +", "+
        profile.phoneNumber;
        if (profileString !== data) {
            updateInfo();
        }
        // Handle form submission, send profile data to server
     }
     const updateInfo = async() => {
        const options = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(profile) // Convert data to JSON string
        };
        await fetch("http://localhost:8080/updateInfo",options)
        .catch(err => console.log(err));
     }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1>Edit Profile</h1>
                    <form onSubmit={handleSubmit}>
                        {wrong && <p style={{color:'red'}}><i>Wrong Password</i></p>}
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleInputChange} placeholder={profile.firstName} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" onChange={handleInputChange} placeholder={profile.lastName} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={profile.email} placeholder="Your Email" readOnly/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password"  onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="npassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="npassword" name="npassword"  onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label">Card Type</label>
                            <select className="form-select" id="paymentMethod" name="paymentMethod" placeholder={profile.paymentMethod} onChange={handleInputChange}>
                            <option value="Visa">Visa</option>
                            <option value="MasterCard">MasterCard</option>
                            <option value="AmericanExpress">American Express</option>
                            <option value="Discover">Discover</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentInfo" className="form-label">Payment Information</label>
                            <input type="text" className="form-control" id="paymentInfo" name="paymentInfo" onChange={handleInputChange} placeholder={profile.paymentInfo}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                            <input type="text" className="form-control" id="billingAddress" name="billingAddress" onChange={handleInputChange} placeholder={profile.billingAddress}  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleInputChange} placeholder="Your Phone Number" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" className="form-check-input" id="promotions" name="promotion" checked={profile.promotion} onChange={handleInputChange} />
                            <label htmlFor="promotions" className="form-check-label">Sign Up for Promotions?</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
