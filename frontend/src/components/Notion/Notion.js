import {Card, CardActions, CardContent, LinearProgress, Divider, Box} from "@mui/material";
import NotionBody from "./NotionBody/NotionBody";
import NotionActions from "./NotionActions/NotionActions";
import {useDispatch, useSelector} from "react-redux";
import {selectNotions, nextNotion, setNotions, resetNotions} from "../../store/notionSlices";
import axios from "axios";
import {NOTION_URL, NOTION_REFRESH_INTERVAL} from "../../common/Constants";
import {useEffect} from "react";
const Notion = () => {
    const notions = useSelector(selectNotions);
    const dispatch = useDispatch();
    const notion = notions.currentItem;

    function getNotions() {
        axios.get(NOTION_URL).then(response => {
            dispatch(setNotions(response.data));
        });
    }

    const loadNextNotion = () => {
        if(notions.currentItemIndex + 1 === notions.notions.length) {
            dispatch(resetNotions());
            getNotions();
        }
        else {
            dispatch(nextNotion());
        }
    }

    useEffect(() => {
        if(notion === null) {
            return;
        }
        const interval = setInterval(loadNextNotion, NOTION_REFRESH_INTERVAL);
        return () => {
            clearInterval(interval);
        };
    }, [notion])

    if(notion === null) {
        getNotions();
    }

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
                    <NotionActions disabled={notion === null} uuid={notion?.uuid} views={notion?.viewsAmount} updateNotion={() => loadNextNotion()}/>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Notion;