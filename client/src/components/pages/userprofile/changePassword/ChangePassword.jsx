import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import "./ChangePassword.css";
import { Button } from "@mui/material";

function ChangePassword() {

    const userId = Cookies.get("userid");

    const [userData, setUserData] = useState({
        userId: userId,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleUserData = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put("http://localhost:4000/change-password", userData);

            if (response.status == 200) {
                console.log(response.data.message)
            }
        }
        catch (error) {
            if (error.status == 401) {
                console.log(error.response.data.message)
            }
            else if (error.status == 500) {
                console.log(error.response.data.message)
            }
        }

        setUserData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    return (
        <div>
            <form onSubmit={handleChangePassword}>
                <div className="change_password_container">
                    <h5 className="mb-4">Change Password</h5>
                    <div className="row">
                        <div className="col-2">
                            <label className="form-label">Old Password:</label>
                        </div>
                        <div className="col-4">
                            <input className="form-control" name="oldPassword" value={userData.oldPassword} onChange={handleUserData} />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-2">
                            <label className="form-label">New Password:</label>
                        </div>
                        <div className="col-4">
                            <input className="form-control" name="newPassword" value={userData.newPassword} onChange={handleUserData} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label className="form-label">Confirm New Password:</label>
                        </div>
                        <div className="col-4">
                            <input className="form-control" name="confirmPassword" value={userData.confirmPassword} onChange={handleUserData} />
                        </div>
                    </div>
                    <div className="row mt-5 ">
                        <div className="col-8 text-center">
                            <Button type="submit" variant="contained" color="success" size="medium">Change Account Password</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default ChangePassword;