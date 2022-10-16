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
import ImageUploading from "react-images-uploading";

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
    const [images, setImages] = useState([])

    const onChange = (imageList) => {
        setImages(imageList);
    };

    const handleAddNotion = () => {
        if(content.length < 1 || source.length < 1 || title.length < 1) {
            setError(true);
            setMessage("Fill in empty fields")
            return;
        }

        setError(false);
        setMessage(null);
        setUploading(true)

        const data = {
            header: title,
            source,
            content,
            pictures: images.length,
            tags: [tag1, tag2, tag3],
        }

        axios.post(NOTION_URL, data)
            .then(response => {
                if (response.status === 200) {
                    let urls = response.data.urls;
                    const promises = []

                    for (let i = 0; i < urls.length; i++) {
                        promises.push(fetch(urls[i], {
                            method: "PUT",
                            body: images[i].file
                        }));
                    }
                    return promises;
                } else {
                    throw Error("Error: " + response.status);
                }
            })
            .then(imagePromises => Promise.all(imagePromises))
            .then(() => {
                setMessage("Notion has been added!");
                clearFields();
            })
            .catch(error => {
                setError(true);
                setMessage(error);
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xl={5} md={12} xs={12}>
            <Box mt={2} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
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
                    </FormElement>
                    <FormElement label="Images">
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={10}
                            dataURLKey="data_url"
                            acceptType={["png"]}
                        >
                            {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
                                  dragProps
                              }) => (

                                <div className="upload__image-wrapper" style={{margin: "10px 0 10px 0"}}>
                                    <Button
                                        color={isDragging ? "error" : "primary"}
                                        variant="contained"
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Click or Drop here
                                    </Button>
                                    &nbsp;
                                    {/*<Button color="error" variant="outlined" onClick={onImageRemoveAll}>Remove all images</Button>*/}
                                    <Box display="flex" mt={1}>
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item" style={{margin: "5px"}}>
                                                <img src={image.data_url} alt="" width="130px" />
                                                <div className="image-item__btn-wrapper">
                                                    <Button size="small" variant="text" color="primary" onClick={() => onImageUpdate(index)}>Update</Button>
                                                    <Button size="small" variant="text" color="error" onClick={() => onImageRemove(index)}>Remove</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </Box>
                                </div>
                            )}
                        </ImageUploading>
                    </FormElement>
                <ReactQuill theme="snow" value={quillContent} onChange={onTextareaChanged} readOnly={uploading}/>
            </Box>
            </Box>
            </Grid>
            <Grid item xl={6} md={12} xs={12}>
                <Box mt={2} sx={{display: 'flex'}}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <PreviewIcon />
                    </Avatar>
                    <Typography sx={{ml:1, lineHeight:'55px'}} variant="h5">Preview</Typography>
                </Box>
                <Card sx={{ width: "750px", maxHeight:"360px" }}>
                    <CardContent>
                        <NotionBody notion={{
                            header: title ? title : "Title",
                            tags: [tag1, tag2, tag3],
                            content: content ? content : "Content",
                            images: images?.map(img => img.data_url),
                            source: source ? source : "source" }}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} xl={6}>
                {message && <Alert sx={{mt: 2}} severity={error ? "error" : "success"}>{message}</Alert>}
                <Button
                    margin="dense"
                    variant="contained"
                    fullWidth
                    sx={{mt:3}}
                    onClick={handleAddNotion}
                    disabled={uploading}
                    type="submit"
                    size="large">{uploading ? <CircularProgress sx={{ml:1}} size="25px" color="inherit"/> : "Add Notion!"}</Button>
            </Grid>
        </Grid>
    );
}

export default AddNotion;