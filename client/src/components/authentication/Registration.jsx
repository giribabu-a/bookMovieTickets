import {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Registration.css";

function Registration(){

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        gender: '',
        password: ''
    });

    const handleUserData = (event)=> {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    };

    const handleRegisterForm = async (event)=> {
        event.preventDefault();

        console.log(userData)

        try{
            const response = await axios.post("http://localhost:4000/register", userData)
            if(response.status === 201){
                console.log(response.data.message)
            }
        }
        catch(error){
            if(error.status === 400){
                console.log(error.response.data.message)
            }
            else{
                console.log(error)
            }
        }
    }

    return (
        <div className="container">
            <div className="row registration_cont">
                <div className="col-sm-none col-md-4 col-lg-5">
                    <div>
                        <img src="" />
                    </div>
                </div>
                <div className="col-sm-12 col-md-8 col-lg-7">
                    <div className="registration_form">
                        <h2 className="text-center mb-4">Registration</h2>
                        <form onSubmit={handleRegisterForm}>
                            <div className="row mb-3">
                                <label className="col-sm-12 col-lg-4">Full Name:</label>
                                <div className="col-sm-12 col-lg-8">
                                    <input type="text" placeholder="Enter fullname" name="fullName" className="form-control" onChange={handleUserData} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-12 col-lg-4">Email:</label>
                                <div className="col-sm-12 col-lg-8">
                                    <input type="email" placeholder="Enter email" name="email" className="form-control" onChange={handleUserData} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className=" col-sm-12 col-lg-4">Mobile Number:</label>
                                <div className="col-sm-12 col-lg-8">
                                    <input type="number" placeholder="Enter mobile number" name="mobileNumber" className="form-control" onChange={handleUserData} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-12 col-lg-4">Select Gender:</label>
                                <div className="col-sm-12 col-lg-8 d-flex align-items-center">
                                    <div className="form-check me-3">
                                        <input type="radio" className="form-check-input" name="gender" value='Male' onChange={handleUserData} />
                                        <label className="form-check-label" value='Male'>Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" name="gender" value='Female' onChange={handleUserData} />
                                        <label className="form-check-label" value='Female'>Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-12 col-lg-4">Password:</label>
                                <div className="col-sm-12 col-lg-8">
                                    <input type="password" placeholder="Enter password" name="password" className="form-control" onChange={handleUserData} />
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <div className="text-center">
                                <p>Already have an account? <Link to="/" className="text-decoration-none">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;