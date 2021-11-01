import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logo from "../../img/logo.png";
import './Navbar.css';

const Navbar = props => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <img className="logo" src={Logo}/>
                    <Typography ml={1} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        RecallAssistant
                    </Typography>
                    <Typography variant="subtitle1"><small>1 listopada,</small> 16:08</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;