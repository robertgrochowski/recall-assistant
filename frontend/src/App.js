import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar/Navbar";
import Notion from "./components/Notion/Notion";
import {Container} from "@mui/material";
import './App.css';

import Login from "./components/Login/Login";

const App = () => {

    const [authenticated, setAuthenticated] = useState(localStorage.getItem("token"));

    return (
      <>
        <Navbar/>
        <Container maxWidth="md" sx={{paddingTop: 2}}>
            {authenticated ? <Notion/> : <Login setAuthenticated={setAuthenticated} />}
        </Container>
      </>
    );
}

export default App;
