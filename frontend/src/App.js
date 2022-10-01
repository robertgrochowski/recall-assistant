import React, {useState} from 'react';
import Navbar from "./components/Navbar/Navbar";
import Notion from "./components/Notion/Notion";
import {Container} from "@mui/material";
import './App.css';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import Login from "./components/Login/Login";
import AddNotion from "./components/AddNotion/AddNotion";

const App = () => {

    const [authenticated, setAuthenticated] = useState(true);
    const location = useLocation();

    return (
        <>
        <Navbar/>
        <Container maxWidth="xl" sx={{paddingTop: 1}}>
            {!authenticated && (location.pathname !== '/login') && <Navigate to={"/login"}/>}
            <Routes>
                <Route path="/" element={<Notion setAuthenticated={setAuthenticated}/>}/>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>}/>
                <Route path="/add" element={<AddNotion/>}>
                </Route>
            </Routes>
        </Container>
        </>
    );
}

export default App;
