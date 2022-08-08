import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import './NotionActions.css';
import axios from "axios";
import {NOTION_URL} from "../../../common/Constants";
import {useState} from "react";

const NotionActions = ({disabled, views, uuid, updateNotion}) => {

    const [updating, setUpdating] = useState(false);

    const onNotionRead = () => {
        setUpdating(true);
        let data = {
            views: (views ?? 0) + 1,
            uuid
        }
        axios.patch(NOTION_URL, data)
            .then(() => {
                updateNotion();
                setUpdating(false);
            });
    }

    return <>
        <Box className="leftAlignControls">
            <Button className="buttonAdd" disabled={updating || disabled} size="large" variant="contained" startIcon={<CheckIcon />} onClick={onNotionRead}>
                Read
            </Button>
            {/*<Button disabled={disabled} sx={{ml: 1}} variant="outlined" startIcon={<ReadMoreIcon />}>
                Więcej
            </Button>*/}
        </Box>
        <Box className="rightAlignControls">
            <Button disabled={updating || disabled} variant="outlined" startIcon={<BookmarkBorderIcon />}>
                Mark
            </Button>
            <Button disabled={updating || disabled} sx={{ml: 1}} variant="outlined" startIcon={<VisibilityOffIcon />}>
                Don't show
            </Button>
        </Box>
    </>;
}

export default NotionActions;