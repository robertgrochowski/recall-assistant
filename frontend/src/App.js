import React, {useState} from 'react';
import Navbar from "./components/Navbar/Navbar";
import Notion from "./components/Notion/Notion";
import {Container} from "@mui/material";
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import Login from "./components/Login/Login";
import AddNotion from "./components/AddNotion/AddNotion";

const App = () => {

    const [authenticated, setAuthenticated] = useState(localStorage.getItem("token"));

    return (
      <Router>
        <Navbar/>
        <Container maxWidth="xl" sx={{paddingTop: 1}}>
            {!authenticated && <Navigate to={"/login"}/>}
            <Routes>
                <Route path="/" element={<Notion/>}/>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>}/>
                <Route path="/add" element={<AddNotion/>}>
                </Route>
            </Routes>
        </Container>
      </Router>
    );
}

export default App;
