import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { Box, Typography, Modal } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import locationContext from "../contextApi/userLocation";
import searchFilter from "../contextApi/searchCriteria";

import "./Header.css";
import logo from "../../assets/logo/bmslogo.png";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const locations = [
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/mumbai.png", name: "Mumbai" },
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/ncr.png", name: "Delhi" },
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/bang.png", name: "Bengaluru" },
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/hyd.png", name: "Hyderabad" },
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/ahd.png", name: "Ahmedabad" },
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/koch.png", name: "Kochi" },
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/chen.png", name: "Chennai" },
    { url: "https://in.bmscdn.com/m6/images/common-modules/regions/kolk.png", name: "Kolkata" }
];

function Header() {

    // user details for registration form
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: ''
    });

    // user data for login form
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    // validation for registration form
    const [registerValidation, setRegisterValidation] = useState({
        registerName: '',
        registreEmail: '',
        registerMobile: '',
        registerPassword: ''
    });

    // validation for login form
    const [validation, setValidation] = useState({
        email: '',
        password: ''
    });

    const { location, setLocation } = useContext(locationContext);
    const {search, setSearch} = useContext(searchFilter);

    const [open, setOpen] = useState(false);
    const [auth, setAuth] = useState('login');


    const nameRegex = /^[^\s][A-Za-z\s]{2,30}[^\s]$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAuth = () => {
        setAuth(auth === "login" ? "register" : "login")
    };

    const handleUserDetails = (event) => {
        const { name, value } = event.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });

        // Validate registration form
        if (name === 'fullName') {
            setRegisterValidation({
                ...registerValidation,
                registerName: nameRegex.test(value) ? "" : "must contain only letters"
            })
        }
        else if (name === "mobileNumber") {
            setRegisterValidation({
                ...registerValidation,
                registerMobile: phoneRegex.test(value) ? "" : "starts with 6-9 & should be 10 digits"
            })
        }

    };
    const handleRegisterForm = async (event) => {
        event.preventDefault();

        console.log(userDetails);

        // Final validation of Registration form checking before submitting
        if (!phoneRegex.test(userDetails.mobileNumber)) {
            setRegisterValidation({ ...registerValidation, registerMobile: "starts with 6-9 & should be 10 digits" });
            return;
        }
        else if (!nameRegex.test(userDetails.fullName)) {
            setRegisterValidation({ ...registerValidation, registerName: "must contain only letters" });
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/register", userDetails)
            if (response.status == 201) {
                console.log(response.data.message);
                toast.success(response.data.message, {
                    theme: "colored"
                });
                setAuth("login");

                setUserDetails({
                    fullName: '',
                    email: '',
                    mobileNumber: '',
                    password: ''
                });
            }
        }
        catch (error) {
            if (error.status == 400) {
                console.log(error.response.data.message)
                toast.error(error.response.data.message, {
                    theme: "colored"
                })
            }
            else {
                console.log(error)
            }
        }
    };

    // login forms handling
    const handleUserData = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });

        //validate email and password while typing
        if (name === 'email') {
            setValidation({
                ...validation,
                email: emailRegex.test(value) ? "" : "Invalid email format"
            })
        }
        else if (name === 'password') {
            setValidation({
                ...validation,
                password: passwordRegex.test(value) ? "" : "Password must be atleast 8 characters, include a number and a special character"
            })
        }
    };
    const handleLoginForm = async (event) => {
        event.preventDefault();

        // Final validation check before submitting
        if (!emailRegex.test(userData.email)) {
            setValidation({ ...validation, email: 'Invalid email format' });
            return;
        };

        if (!passwordRegex.test(userData.password)) {
            setValidation({
                ...validation,
                password: 'Password must be at least 8 characters, include a number and a special character'
            });
            return;
        };

        console.log(userData)

        try {
            const response = await axios.post("http://localhost:4000/login", userData);
            if (response.status == 200) {
                console.log(response.data)
                Cookies.set('email', userData.email)
                Cookies.set("userid", response.data.userid)

                toast.success('Login successful!', {
                    autoClose: 5000,
                    theme: "colored",
                });
                handleClose()
            }
        }
        catch (error) {
            if (error.status == 400) {
                console.log(error.response.data.message)
                toast.error(`${error.response.data.message}`, {
                    autoClose: 5000,
                    theme: "colored",
                });
            }
            else if (error.status == 401) {
                console.log(error.response.data.message)
                toast.error(`${error.response.data.message}`, {
                    autoClose: 5000,
                    theme: "colored",
                });
            }
            else {
                console.log(error)
            }
        }

        // Reset form fields
        setUserData({
            email: '',
            password: ''
        })
    };

    let isUserFound = Cookies.get("userid");

    
    return (
        <div className="container">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />

            <div className="header_container">
                <div className="d-flex align-items-center">
                    <div className="header_logo_cont">
                        <Link to="/">
                            <img src={logo} alt='logo' className="w-100" />
                        </Link>
                    </div>
                    <div className="header_search_box input-group">
                        <span className="input-group-text"><IoSearch /></span>
                        <input type="text" placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            className="form-control" aria-label="search" value={search} onChange={(e)=> setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    {/* Location button trigger modal  */}
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="modal" aria-expanded="false"
                            data-bs-target='#locations'>
                            {location}
                        </button>
                    </div>

                    {/* Locations modal  */}
                    <div className="modal fade" id="locations">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="input-group my-3">
                                        <span className="input-group-text"><IoSearch /></span>
                                        <input type="text" className="form-control" placeholder="Search for your city" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center">Popular Cities</div>
                                    <div className="locations_container">
                                        {
                                            locations.map((loc) => (
                                                <div key={loc.name} className={`each_locations_cont`} onClick={()=> setLocation(loc.name)} data-bs-dismiss="modal" aria-label="Close">
                                                    <div className={`${location === loc.name ? 'location_active' : ''}`}>
                                                        <img src={loc.url} alt={loc.name} />
                                                    </div>
                                                    <div>{loc.name}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            isUserFound ? (
                                <div className="header_bars_icon ms-4">
                                    <Link to="/profile" className="text-dark">
                                        <FaCircleUser className="fs-3" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="header_signin_btn ms-4">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#signinModal" onClick={handleOpen}>Sign in</button>
                                </div>
                            )
                        }
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {
                            auth === "login" ? (
                                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                                        Login
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <form onSubmit={handleLoginForm}>
                                            <div class="mb-3">
                                                <label htmlFor="email" class="form-label">Email:</label>
                                                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                                                    value={userData.email} onChange={handleUserData} />
                                                {validation.email && <small className="text-danger">{validation.email}</small>}
                                            </div>
                                            <div class="mb-3">
                                                <label htmlFor="password" class="form-label">Password:</label>
                                                <input type="password" class="form-control" id="password" placeholder="Enter password" name="password"
                                                    value={userData.password} onChange={handleUserData} />
                                                {validation.password && <small className="text-danger">{validation.password}</small>}
                                            </div>
                                            <div className="text-center login_btn">
                                                <button type="submit" disabled={validation.email || validation.password}>Continue</button>
                                            </div>
                                            <div className="text-center mt-3">
                                                <p>Don't have an account? <a href="#" onClick={handleAuth}>Register</a></p>
                                            </div>
                                        </form>
                                    </Typography>
                                </Box>
                            ) : (
                                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                                        Registration
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <form onSubmit={handleRegisterForm}>
                                            <div className="mb-3">
                                                <label className="form-label">Full Name: <span className="asterik_sign">*</span></label>
                                                <input type="text" placeholder="Enter fullname" name="fullName" className="form-control" value={userDetails.fullName} onChange={handleUserDetails} />
                                                {registerValidation.registerName && <small className="text-danger mt-1">{registerValidation.registerName}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email Address: <span className="asterik_sign">*</span></label>
                                                <input type="email" placeholder="Enter email" name="email" className="form-control" value={userDetails.email} onChange={handleUserDetails} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Mobile Number: <span className="asterik_sign">*</span></label>
                                                <input type="number" placeholder="Enter mobile number" name="mobileNumber" className="form-control" value={userDetails.mobileNumber} onChange={handleUserDetails} />
                                                {registerValidation.registerMobile && <small className="text-danger mt-1">{registerValidation.registerMobile}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password: <span className="asterik_sign">*</span></label>
                                                <input type="password" placeholder="Enter password" name="password" className="form-control" value={userDetails.password} onChange={handleUserDetails} />
                                            </div>
                                            <div className="text-center">
                                                <button className="btn btn-primary">Register</button>
                                            </div>
                                            <div className="text-center mt-3">
                                                <p>Already have an account? <a href="#" onClick={handleAuth} className="text-decoration-none">Login</a></p>
                                            </div>
                                        </form>
                                    </Typography>
                                </Box>
                            )
                        }

                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Header;