import { useState } from 'react';
import cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import "./Sidebar.css";

const items = [
    { text: 'My Profile', icon: <AccountCircleIcon />, path: 'details' },
    { text: 'My Bookings', icon: <MovieIcon />, path: 'bookings' },
    { text: 'Favourites', icon: <FavoriteIcon />, path: 'favourites' },
    { text: 'Change Password', icon: <LockIcon />, path: 'change-password' },
    { text: "Help & Support", icon: <HelpCenterIcon />, path: 'help' },
    { text: "Account & Settings", icon: <SettingsIcon />, path: 'settings' }
];


function Sidebar() {

    const userId = cookies.get("userid");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleLogoutBtn = () => {
        cookies.remove("userid");
        navigate("/")
    };

    return (
        <div>
            {
                items.map((item, index) => (
                    <Link to={item.path} className='text-decoration-none text-dark'>
                        <ListItemButton selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </ListItemButton>
                    </Link>
                ))
            }

            {
                userId && (
                    <ListItemButton onClick={handleLogoutBtn}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                )
            }
        </div>
    );
}

export default Sidebar;