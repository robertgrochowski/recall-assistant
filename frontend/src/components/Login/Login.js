import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import {NOTION_URL} from "../../common/Constants";
import {useState} from "react";
import {Alert, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Login = ({setAuthenticated}) => {

    const [loginInProgress, setLoginInProgress] = useState(false)
    const [apiError, setApiError] = useState("");
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoginInProgress(true);
        setApiError("");
        const username = data.get('username');
        const pass = data.get('password');
        localStorage.setItem('token', Buffer.from(`${username}:${pass}`).toString('base64'));

        axios.get(NOTION_URL).then(() => {
            setAuthenticated(true);
            navigate("/");
        }).catch(error => {
            if(error?.response?.status === 401) {
                setApiError("Invalid credentials");
            }
            else {
                setApiError("API error");
                console.log(error);
            }
        }).finally(() => setLoginInProgress(false));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {apiError && <Alert severity="error">{apiError}</Alert>}
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loginInProgress}
                >
                    {loginInProgress ? <CircularProgress sx={{ml:1}} size="25px" color="inherit"/> : "Sign In"}
                </Button>
            </Box>
        </Box>
    );
}
export default Login;