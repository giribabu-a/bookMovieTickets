import { useState } from "react";
import axios from "axios";

import "./Login.css";

function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [validation, setValidation] = useState({
        email: '',
        password: ''
    });

    // const {isModalOpen, setIsModalOpen} = useContext(myContext)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // const handleClose = ()=> {
    //     setOpen(false)
    // }

    const handleUserDetails = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });

        //validate email and password while typing
        if(name === 'email'){
            setValidation({
                ...validation,
                email: emailRegex.test(value) ? "" : "Invalid email format"
            })
        }
        else if(name === 'password'){
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
        }
        if (!passwordRegex.test(userData.password)) {
            setValidation({
                ...validation,
                password: 'Password must be at least 8 characters, include a number and a special character'
            });
            return;
        }

        console.log(userData)

        try{
            const response = await axios.post("http://localhost:4000/login", userData);
            if(response.status == 200){
                console.log(response.data.message)
                // setIsModalOpen(false)
                    handleClose()
            }
        }
        catch(error){
            if(error.status == 400){
                console.log(error.response.data.message)
            }
            else if(error.status == 401){
                console.log(error.response.data.message)
            }
            else{
                console.log(error)
            }
        }
        
        // Reset form fields
        setUserData({
            email: '',
            password: ''
        })
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleLoginForm}>
                        <div class="mb-3">
                            <label htmlFor="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                                value={userData.email} onChange={handleUserDetails} />
                            {validation.email && <small className="text-danger">{validation.email}</small>}
                        </div>
                        <div class="mb-3">
                            <label htmlFor="password" class="form-label">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter password" name="password"
                                value={userData.password} onChange={handleUserDetails} />
                            {validation.password && <small className="text-danger">{validation.password}</small>}
                        </div>
                        <div className="text-center login_btn">
                            <button type="submit" disabled={validation.email || validation.password}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;