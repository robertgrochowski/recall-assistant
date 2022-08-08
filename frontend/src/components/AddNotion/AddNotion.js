import {
    Alert,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    InputAdornment,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import '../../App.css';
import TagIcon from '@mui/icons-material/Tag';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PreviewIcon from '@mui/icons-material/Preview';
import React, {useState} from "react";
import axios from "axios";
import {NOTION_URL} from "../../common/Constants";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './AddNotion.css';
import FormElement from "./FormElement";
import NotionBody from "../Notion/NotionBody/NotionBody";

const AddNotion = () => {

    const HashtagIcon = () => (<InputAdornment position="start"><TagIcon /></InputAdornment>);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [source, setSource] = useState("");
    const [quillContent, setQuillContent] = useState("");
    const [content, setContent] = useState("");
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [tag3, setTag3] = useState("")


    const handleAddNotion = () => {
        setUploading(true)
        const data = {
            header: title,
            source,
            content,
            tags: [tag1, tag2, tag3]
        }
        axios.post(NOTION_URL, data)
        .then(response => {
            if(response.status === 200) {
                setMessage("Notion has been added!");
                clearFields();
            } else {
                setMessage("Error "+response.status);
                setError(true);
            }
        })
        .finally(() => setUploading(false));
    }

    function clearFields() {
        setQuillContent("");
        setContent("");
        setTag1("");
        setTag2("");
        setTag3("");
        setTitle("");
        setSource("");
    }

    const onTextareaChanged = (value) => {
        setQuillContent(value);
        let fixedFormat = value.replaceAll("<p>", "</br>").replaceAll("</p>", "");
        fixedFormat = fixedFormat.startsWith("</br>") ? fixedFormat.substring(5) : fixedFormat;
        //let fixedFormat = value;
        setContent(fixedFormat);
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
            <Grid item xl={5} md={12} xs={12}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <Box sx={{ mt: 1}}>
                    <Box sx={{display: 'flex'}}>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <NoteAddIcon />
                            </Avatar>
                            <Typography sx={{ml:1, lineHeight:'55px'}} variant="h5">Add a notion</Typography>
                    </Box>
                    <FormElement label="Title" required>
                        <TextField variant="standard" disabled={uploading}
                                   onChange={(e)=>setTitle(e.target.value)}
                                   required
                                   fullWidth
                                   autoFocus
                                   value={title}
                        />
                    </FormElement>
                    <FormElement label="Source">
                        <TextField variant="standard" disabled={uploading}
                                   onChange={(e)=>setSource(e.target.value)}
                                   fullWidth
                                   value={source}
                        />
                    </FormElement>
                    <FormElement label="Tags">
                        <Grid container spacing={1} sx={{mb:1}}>
                            <Grid item xs={4}>
                                <TextField InputProps={{startAdornment: HashtagIcon()}} variant="standard"
                                           disabled={uploading} onChange={(e)=>setTag1(e.target.value)}
                                           value={tag1}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField InputProps={{startAdornment: HashtagIcon()}} variant="standard"
                                           disabled={uploading} onChange={(e)=>setTag2(e.target.value)}
                                           value={tag2}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField InputProps={{startAdornment: HashtagIcon()}} variant="standard"
                                           disabled={uploading} onChange={(e)=>setTag3(e.target.value)}
                                           value={tag3}/>
                            </Grid>
                        </Grid>
                    <ReactQuill theme="snow" value={quillContent} onChange={onTextareaChanged} readOnly={uploading}/>
                    </FormElement>
                </Box>
            </Box>
            </Grid>
            <Grid item xl={6} md={12} xs={12}>
                <Box sx={{display: 'flex'}}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <PreviewIcon />
                    </Avatar>
                    <Typography sx={{ml:1, lineHeight:'55px'}} variant="h5">Preview</Typography>
                </Box>
                <Card sx={{ width: "750px", maxHeight:"320px" }}>
                    <CardContent>
                        <NotionBody notion={{
                            header: title ? title : "Title",
                            tags: [tag1, tag2, tag3],
                            content: content ? content : "Content",
                            source: source ? source : "source" }}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} xl={12}>
                {message && <Alert severity={error ? "error" : "success"}>{message}</Alert>}
                <Button
                    margin="dense"
                    variant="contained"
                    fullWidth
                    sx={{mt:1}}
                    onClick={handleAddNotion}
                    disabled={uploading}
                    type="submit"
                    size="large">{uploading ? <CircularProgress sx={{ml:1}} size="25px" color="inherit"/> : "Add Notion!"}</Button>
            </Grid>
        </Grid>
    );
}

export default AddNotion;