import { Outlet } from "react-router-dom";

import Header from "../../header/Header";
import Navbar from "../../header/Navbar";
import Sidebar from "./Sidebar";

function Profile(){
    return (
        <div>
            <Header />
            <Navbar />
            <div className="container-fluid">
                <div className="row py-3">
                    <div className="col-lg-2">
                        <Sidebar />
                    </div>
                    <div className="col-lg-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;