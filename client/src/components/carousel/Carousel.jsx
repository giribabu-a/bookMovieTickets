import "./Carousel.css";

function Carousel() {
    return (
        <div className="carousel_cont">
            <div className="container-fluid">
                <div className="carousel slide" id="carouselExampleIndicators">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1730207692283_peppahyderabad1web.jpg" className="d-block w-100 carousel_image" alt="image1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1730299516327_1240x300lineupsunburn.jpg" className="d-block w-100 carousel_image" alt="image2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg" className="d-block w-100 carousel_image" alt="image3" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Carousel;