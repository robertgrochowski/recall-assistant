import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Logo from "../../img/logo.png";
import './Navbar.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Navbar = () => {
    let navigate = useNavigate();
    const [time, setTime] = useState("");

    const updateTime = () => {
        let today = new Date();
        let minutes = today.getMinutes() < 10 ? "0"+today.getMinutes() : today.getMinutes();
        let hours = today.getHours() < 10 ? "0"+today.getHours() : today.getHours();
        setTime(`${hours}:${minutes}`);
    }

    useEffect(()=> {
        updateTime();
        setInterval(updateTime, 10 * 1000);
    }, [])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img className="logo" src={Logo}/>
                    <Typography onClick={()=>navigate("/")} ml={1} variant="h6" component="div" sx={{ flexGrow: 1, cursor:'pointer' }}>
                        RecallAssistant
                    </Typography>
                    <Typography variant="subtitle1"><small></small>{time}</Typography>
                    <IconButton aria-label="add" onClick={()=>navigate("/add")}>
                        <AddBoxIcon sx={{ml: 1, fontSize:30, color:"#fff" }}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );

}

export default Navbar;