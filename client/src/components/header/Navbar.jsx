import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar_main_container">
            <div className="container">
                <div className="navbar_container">
                    <div>
                        <a href="#" className="me-4">Movies</a>
                        <a href="#" className="me-4">Stream</a>
                        <a href="#" className="me-4">Events</a>
                        <a href="#" className="me-4">Plays</a>
                        <a href="#" className="me-4">Sports</a>
                        <a href="#">Activities</a>
                    </div>
                    <div>
                        <a href="#">ListYourShow</a>
                        <a href="#" className="ms-4">Corporates</a>
                        <a href="#" className="ms-4">Offers</a>
                        <a href="#" className="ms-4">Gift Cards</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;