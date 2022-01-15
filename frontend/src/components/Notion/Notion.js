import {Card, CardActions, CardContent, LinearProgress, Divider} from "@mui/material";
import NotionBody from "./NotionBody/NotionBody";
import NotionActions from "./NotionActions/NotionActions";
import {useEffect, useState} from "react";
import axios from "axios";
import {GET_RANDOM_NOTION_URL} from "../../common/Constants";

const Notion = props => {
    const [notion, setNotion] = useState(null);

    const updateNotion = () => {
        axios.get(GET_RANDOM_NOTION_URL)
            .then(response => {
                setNotion(response.data)
        })
    }

    useEffect(() => {
        updateNotion();
        setInterval(updateNotion, 10*60*1000);
    }, [])

    return (
        <Card sx={{ width: "750px" }}>
            <CardContent>
                {notion ? <NotionBody notion={notion}/> : <LinearProgress />}
            </CardContent>
            <Divider sx={{marginInline: 2}} light />
            <CardActions>
                <NotionActions disabled={notion === null}/>
            </CardActions>
        </Card>
    );
}

export default Notion;