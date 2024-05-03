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
        promotion: 0,
        address: '',
        phoneNumber: '',
        expirationDate:""
    });
    const [data, setData] = useState("");
    //password
    const [wrong, setWrong] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:8080/getInfo")
            .then(response => {
                const data = response.data.split("\t");
                console.log(data)
                setProfile(profile => ({firstName: data[0],
                lastName: data[1],
                email: data[2],
                password: data[3],
                paymentMethod: data[4],
                paymentInfo: data[5],
                promotion: data[6],
                expirationDate:data[7],
                address: data[8],
            phoneNumber: data[9]}));
            })
            .catch(error => console.error('Error fetching profile data:', error));
    }, []);
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (name === "promostatus") {
            var val = event.target.value === "yes" ? 1 : 0;
            setProfile(prevState => ({
                ...prevState,
                "promotion": val
            }));
        } else if (name === "npassword" && value !== profile.password ) {
            if (document.getElementById("password").value === data.split(", ")[3]) {
                setProfile({ ...profile, password: value });
            }
            else {
                setWrong(true)
            }
        }
        else {
            setProfile({...profile, [name]:value})
        }
        //console.log(profile.expirateDate);
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
        profile.address +", "+
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
        console.log(profile)
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
                            <label htmlFor="address" className="form-label">Billing Address</label>
                            <input type="text" className="form-control" id="address" name="address" onChange={handleInputChange} placeholder={profile.address}  />
                        </div>
                        <div class="mb-3">
                            <label for="expirationDate" class="form-label">Expiration Date </label>
                            <input type="date" class="form-control" id="expirationDate" name="expirationDate" minlength="16" maxlength="16" onChange={handleInputChange} value={profile.expirationDate}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleInputChange} placeholder={profile.phoneNumber} />
                        </div>
                        <div class="mb-3">
                            <label for="promostatus" class="form-label">Sign Up for Promotions?</label>
                            <select class="form-select" id="promostatus" name="promostatus" onChange={handleInputChange}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>     
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
