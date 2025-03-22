import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { RxDotFilled } from "react-icons/rx";
import { FaStar } from "react-icons/fa";

import Header from "../../header/Header";
import Navbar from "../../header/Navbar";
import "./MovieDetails.css";
import { Button } from "@mui/material";

function MovieDetails() {

    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState({
        id: 0,
        title: '',
        runtime: 0,
        vote_average: 0,
        vote_count: 0,
        release_date: '',
        poster_url: '',
        bg_poster_url: '',
        certificate: '',
        description: '',
        Locations: [],
        formats: [],
        genres: [],
        languages: []
    });
    const { movieId } = useParams();


    // accessing all movies from the  API
    useEffect(() => {
        axios.get("https://mocki.io/v1/07777abf-ff98-4e92-9401-4cce6f16357c")
            .then((res) => {
                setMovies(res.data)
                console.log(res.data)
            })
            .catch((error) => {
                console.log("Error fetching movies:", error);
            })
    }, []);

    // Getting movie details based on movieId when movies or movieId changes
    useEffect(() => {

        if (movies.length > 0 && movieId) {

            const selectedMovie = movies.find((movie) => String(movie.id) === movieId);

            const formattedReleaseDate = formatReleaseDate(selectedMovie.release_date)
            const formattedRuntime = convertRuntime(selectedMovie.runtime);

            setMovieDetails({
                ...selectedMovie,
                release_date: formattedReleaseDate,
                runtime: formattedRuntime
            });

        }
    }, [movies, movieId]);

    const convertRuntime = (movieRuntime) => {
        const hours = Math.floor(movieRuntime / 60);  //get the number of hours
        const minutes = movieRuntime % 60;  //get the remaining minutes

        return `${hours}h ${minutes}m`;
    };

    const formatReleaseDate = (movieReleaseDate) => {
        const date = new Date(movieReleaseDate);

        // get day, month and year parts
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`
    };

    const handleBuyTickets = () => {

    }


    return (
        <div>
            <Header />
            <Navbar />

            <div className="movie_details_container"
                style={{
                    backgroundImage: `url(${movieDetails.bg_poster_url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',

                }}>
                <div className="container">

                    {movies.length > 0 ? (
                        <div>
                            {
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img src={movieDetails.poster_url} alt="" className="rounded" />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card-body movie_card_details_cont">
                                            <div>
                                                <div>
                                                    <h2>{movieDetails.title}</h2>
                                                </div>
                                                <div className="my-3 movie_rating_cont">
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex align-items-center"><FaStar className="movie_rating_icon" /></div>
                                                        <div className="mx-3">{movieDetails.vote_average}/10</div>
                                                        <div>({movieDetails.vote_count} Votes)</div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        {movieDetails.formats && (
                                                            <div className="movie_spoken_languages me-2">
                                                                {movieDetails.formats.map((ele) => ele.name).join(', ')}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {
                                                        movieDetails.languages && (
                                                            <div className="movie_spoken_languages">
                                                                {movieDetails.languages.map((lang) => lang.name).join(', ')}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="my-3 movie_details_rgr">
                                                    <div>{movieDetails.runtime}</div>
                                                    <div className="movie_details_rgr_dots"><RxDotFilled /></div>
                                                    <div>
                                                        {
                                                            movieDetails.genres && (
                                                                <div>
                                                                    {
                                                                        movieDetails.genres.map((ele) => ele.name).join(', ')
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="movie_details_rgr_dots"><RxDotFilled /></div>
                                                    <div>{movieDetails.certificate}</div>
                                                    <div className="movie_details_rgr_dots"><RxDotFilled /></div>
                                                    <div>{movieDetails.release_date}</div>
                                                </div>
                                                <div className="movie_book_tickets_btn">
                                                    <button type="button" data-bs-toggle="modal" data-bs-target="#formatModal">Book Tickets</button>
                                                </div>

                                                <div className="modal fade text-dark" id="formatModal" tabIndex="-1">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <div className="fs-5">{movieDetails && movieDetails.title}</div>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <h5>Select language and format</h5>
                                                                <div className="format_modal_languages">
                                                                    {movieDetails.languages && movieDetails.languages.length > 0
                                                                        ? movieDetails.languages[0].name
                                                                        : 'No Language Available'}
                                                                </div>
                                                                <Link to="/buytickets"><Button variant="outlined">2D</Button></Link>
                                                                <div className="format_modal_languages">
                                                                    {movieDetails.languages && movieDetails.languages.length > 0
                                                                        ? movieDetails.languages[1].name
                                                                        : 'No Language Available'}
                                                                </div>
                                                                <Link to="/buytickets"><Button variant="outlined">2D</Button></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (<h2 className="text-danger">No Movie Details</h2>)
                    }

                </div>
            </div>

            <div className="container py-4">
                <div>
                    <h3>About the movie</h3>
                    <div>{movieDetails.description}</div>
                </div>
            </div>
        </div>
    )
};

export default MovieDetails;