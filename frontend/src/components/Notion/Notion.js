import {Card, CardActions, CardContent, LinearProgress, Divider, Box} from "@mui/material";
import NotionBody from "./NotionBody/NotionBody";
import NotionActions from "./NotionActions/NotionActions";
import {useEffect, useState} from "react";
import axios from "axios";
import {NOTION_URL} from "../../common/Constants";

const Notion = ({setAuthenticated}) => {
    const [notion, setNotion] = useState(null);

    const updateNotion = () => {
        setNotion(null);
        axios.get(NOTION_URL)
            .then(response => {
                console.log(response.data)
                setNotion(response.data)
            }).catch(error => {
                if(error?.response?.status === 401) {
                    console.log("get error, authenticated = false")
                    setAuthenticated(false)
                }
            })
    }

    useEffect(() => {
        updateNotion();
        setInterval(updateNotion, 10*60*1000);
    }, [])

    return (
        <Box display="flex"
             alignItems="center"
             justifyContent="center">
            <Card sx={{ width: "770px" }}>
                <CardContent>
                    {notion ? <NotionBody notion={notion}/> : <LinearProgress />}
                </CardContent>
                <Divider sx={{marginInline: 2}} light />
                <CardActions>
                    <NotionActions disabled={notion === null} uuid={notion?.uuid} views={notion?.viewsAmount} updateNotion={updateNotion}/>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Notion;