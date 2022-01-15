import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichText() {
    const [value, setValue] = useState('');

    useEffect(()=> {
        setValue("<strong>witaj w swiecie</strong>")
    }, [])

    const onChanged = (text) => {
        console.log(text);
        setValue(text);
    }

    return (
        <ReactQuill theme="snow" value={value} onChange={onChanged}/>
    );


}

export default RichText