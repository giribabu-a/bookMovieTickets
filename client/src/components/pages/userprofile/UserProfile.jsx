import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./UserProfile.css";

import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UserProfile() {

    const userId = Cookies.get("userid");
    const navigate = useNavigate();

    const [accountDetails, setAccountDetails] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        userId: userId,
        age: "",
        gender: "",
        address: ""
    });
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [openCancel, setOpenCancel] = useState(false);

    const genres = ["Drama", "Action", "Adventure", "Comedy", "Thriller", "Animation", "Romantic", "Family", "Period", "Suspense", "Crime",
        "Fantasy", "Historical", "Horror", "Mystery", "Sci-Fi"];

    // fetching user details by userId
    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/profile/${userId}`);
                if (response.status === 200) {
                    console.log(response)
                    setAccountDetails(response.data.user)
                    setSelectedGender(response.data.user.gender)
                    fetchUserGenres(response.data.genres.genres)
                }
            }
            catch (error) {
                console.log("Error fetching user details", error);
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    // converting user favourite genres (string) into array
    const fetchUserGenres = (genres) => {
        const FavoriteGenres = genres.split(",")
        setSelectedGenres(FavoriteGenres)
    };

    // handling user gender
    const handleGenderChange = (gender) => {
        setSelectedGender(gender)
        setAccountDetails({ ...accountDetails, gender: gender })
    };

    // handling user favourite genres 
    const handleGenreChange = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        }
        else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    // handling user details
    const handleAccountDetails = (event) => {
        const { name, value } = event.target;

        setAccountDetails({
            ...accountDetails, [name]: value
        })
    };

    // PUT API for User Profile
    const handleUserDetails = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.put("http://localhost:4000/edituserdetails", { accountDetails, selectedGenres })
            if (response.status === 200) {
                console.log(response.data.message)
                toast.success('Changes saved successfully', {
                    theme: 'colored'
                })
            }
        }
        catch (error) {
            if (error.status === 404) {
                console.log(error)
                toast.error('User not found', {
                    theme: 'colored'
                })
            }
            else {
                console.log(error)
            }
        }
    };

    const handleOpenCancel = () => setOpenCancel(true);
    const handleCloseCancel = () => setOpenCancel(false);

    const handleDetailsCancel = () => {
        navigate('/')
    };

    console.log(userId)

    return (
        <div>
            <form >

                <Typography sx={{ marginBottom: 4 }}>
                    <div className='details_container'>
                        <h4>Account Details</h4>
                        <div className='mt-4'>
                            <div className='row'>
                                <div className='col-2'>
                                    <label className='form-label'>Full Name:</label>
                                </div>
                                <div className='col-6'>
                                    <input className='form-control' name="fullName" value={accountDetails.fullName}
                                        onChange={handleAccountDetails} />
                                </div>
                            </div>
                            <div className='row my-4'>
                                <div className='col-2'>
                                    <label className='form-label'>Email Address:</label>
                                </div>
                                <div className='col-6'>
                                    <input className='form-control' name="email" value={accountDetails.email}
                                        onChange={handleAccountDetails} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2'>
                                    <label className='form-label'>Mobile Number:</label>
                                </div>
                                <div className='col-6'>
                                    <input className='form-control' name="mobileNumber" value={accountDetails.mobileNumber}
                                        onChange={handleAccountDetails} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Typography>

                <Typography sx={{ marginBottom: 4 }}>
                    <div className='details_container'>
                        <h4>Personal Details</h4>
                        <div className='mt-4'>
                            <div className='row'>
                                <div className='col-2'>
                                    <label className='form-label'>Age:</label>
                                </div>
                                <div className='col-6'>
                                    <input className='form-control' name="age" value={accountDetails.age}
                                        onChange={handleAccountDetails} />
                                </div>
                            </div>
                            <div className='row my-4'>
                                <div className='col-2'>
                                    <label className='form-label'>Gender:</label>
                                </div>
                                <div className='col-6'>
                                    <Stack direction="row" spacing={2}>
                                        <Button color="primary" variant={selectedGender === 'Male' ? "contained" : "outlined"}
                                            onClick={() => handleGenderChange('Male')} value={accountDetails.gender} >
                                            Male
                                        </Button>
                                        <Button color='primary' variant={selectedGender === 'Female' ? "contained" : "outlined"}
                                            onClick={() => handleGenderChange('Female')} value={accountDetails.gender} >
                                            Female
                                        </Button>
                                        <Button color='primary' variant={selectedGender === 'Others' ? "contained" : "outlined"}
                                            onClick={() => handleGenderChange('Others')} value={accountDetails.gender} >
                                            Others
                                        </Button>
                                    </Stack>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2'>
                                    <label className='form-label'>Physical Address:</label>
                                </div>
                                <div className='col-6'>
                                    <textarea cols='65' rows='3' className='form-control' name="address"
                                        value={accountDetails.address} onChange={handleAccountDetails}>

                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </Typography>

                <Typography>
                    <div className='details_container'>
                        <h4 className='mb-4'>Favourite Genres</h4>
                        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap' }} spacing={3}>
                            {genres.map((genre) => (
                                <Button variant={selectedGenres.includes(genre) ? "contained" : "outlined"} color="secondary"
                                    onClick={() => handleGenreChange(genre)}>
                                    {genre}
                                </Button>
                            ))}
                        </Stack>
                    </div>
                </Typography>

                <Typography>
                    <div className='text-center my-4'>
                        <Button variant='contained' color='error' onClick={handleOpenCancel}>Cancel</Button>
                        <Button variant='contained' color='success' className='ms-5' onClick={handleUserDetails} endIcon={<CloudUploadIcon />}>Save Changes</Button>
                    </div>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
                    <Modal
                        open={openCancel}
                        onClose={handleCloseCancel}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="cancelBtnStyles">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure you want to cancel?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <Button variant="contained" color="error" onClick={handleCloseCancel}>No</Button>
                                <Button variant="contained" color="success" sx={{ ml: 3 }} onClick={handleDetailsCancel}>Yes</Button>
                            </Typography>
                        </Box>
                    </Modal>
                </Typography>

            </form>
        </div>
    )
};

export default UserProfile;