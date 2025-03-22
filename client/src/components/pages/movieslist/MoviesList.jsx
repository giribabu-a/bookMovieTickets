import { Link } from "react-router-dom";
import "./MoviesList.css";

function MoviesList({ movieslist }) {

    // console.log(movieslist)
    const { poster_url, title, id } = movieslist;

    return (
        <div className="col-sm-6 col-md-3 col-lg-2">
            <Link to={`/moviedetails/${id}`} className="text-decoration-none">
                <div className="card h-100 movie_cards border-0">
                    {/* <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" /> */}
                    <img src={poster_url} alt="" />
                    <div className="card-body">
                        <h6>{title}</h6>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default MoviesList;