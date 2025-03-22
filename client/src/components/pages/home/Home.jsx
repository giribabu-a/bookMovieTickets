import { useEffect, useState, useContext } from "react";
import axios from "axios";

import "./Home.css";
import Carousel from "../../carousel/Carousel";
import Header from "../../header/Header";
import Navbar from "../../header/Navbar";
import MoviesList from "../movieslist/MoviesList";
import Footer from "../../footer/Footer";
import locationContext from "../../contextApi/userLocation";
import searchFilter from "../../contextApi/searchCriteria";

function Home() {

    const [moviesList, setMoviesList] = useState([]);
    const [locationMovies, setLocationMovies] = useState([]);
    const { location } = useContext(locationContext);
    const { search } = useContext(searchFilter);

    useEffect(() => {
        const response = axios.get("https://mocki.io/v1/07777abf-ff98-4e92-9401-4cce6f16357c");

        response.then((res) => {
            if (res.status === 200) {
                const allMovies = res.data;

                // Set the complete list of movies
                setLocationMovies(res.data)

                // Filter movies for the default location (Hyderabad)
                const filteredMovies = allMovies.filter((movie) => movie.Locations.includes(location))

                // Set the initial list of movies based on the default location
                setMoviesList(filteredMovies)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    useEffect(() => {
        const filteredMovies = locationMovies.filter((movie) => movie.Locations.includes(location))
        setMoviesList(filteredMovies)
    }, [location, locationMovies]);

    useEffect(() => {
        const searchedMovie = locationMovies.filter((movie) => movie.title.includes(search));
        setMoviesList(searchedMovie)
    }, [search]);


    return (
        <div>
            <Header />
            <Navbar />
            <Carousel />
            <div className="container my-4">
                {
                    moviesList.length > 0 ?
                        (<div className="row row-gap-4">
                            {
                                moviesList.map((element) => {
                                    return (
                                        <MoviesList movieslist={element} />
                                    )
                                })
                            }
                        </div>)
                        :
                        (<h2 className="text-danger">No movies data</h2>)
                }
            </div>
            <Footer />
        </div>
    )
};

export default Home;