import {Card, CardActions, CardContent, LinearProgress, Divider, Box} from "@mui/material";
import NotionBody from "./NotionBody/NotionBody";
import NotionActions from "./NotionActions/NotionActions";
import {useDispatch, useSelector} from "react-redux";
import {selectNotion, nextNotion} from "../../store/notionSlices";

const Notion = () => {
    const notion = useSelector(selectNotion);
    const dispatch = useDispatch();

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
                    <NotionActions disabled={notion === null} uuid={notion?.uuid} views={notion?.viewsAmount} updateNotion={() => dispatch(nextNotion())}/>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Notion;