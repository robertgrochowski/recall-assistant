import React from "react";
import Box from "@mui/material/Box";
import "./AddNotion.css";

const FormElement = ({label, required, children}) => {

    return (
        <Box sx={{mt: 1, mb:1}}>
            <small className="inputLabel">{label} {required ? "*" : ""}</small>
            {children}
        </Box>
    );
}

export default FormElement;