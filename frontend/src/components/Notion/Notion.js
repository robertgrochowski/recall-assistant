import {Card, CardActions, CardContent, LinearProgress, Divider, Box} from "@mui/material";
import NotionBody from "./NotionBody/NotionBody";
import NotionActions from "./NotionActions/NotionActions";
import {useEffect, useState} from "react";
import axios from "axios";
import {GET_RANDOM_NOTION_URL} from "../../common/Constants";

const Notion = props => {
    const [notion, setNotion] = useState(null);

    const updateNotion = () => {
        setNotion(null);
        axios.get(GET_RANDOM_NOTION_URL)
            .then(response => {
                console.log(response.data)
                setNotion(response.data)
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
            <Card sx={{ width: "750px" }}>
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