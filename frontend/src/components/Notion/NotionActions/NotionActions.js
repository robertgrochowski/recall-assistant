import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import './NotionActions.css';

const NotionActions = ({disabled, views, uuid, updateNotion}) => {

    return <>
        <Box className="leftAlignControls">
            <Button className="buttonRecalled" disabled={disabled} size="large" variant="contained" startIcon={<CheckIcon />} onClick={updateNotion}>
                Recalled
            </Button>
            {/*<Button disabled={disabled} sx={{ml: 1}} variant="outlined" startIcon={<ReadMoreIcon />}>
                Więcej
            </Button>*/}
        </Box>
        <Box className="rightAlignControls">
            <Button disabled={disabled} variant="outlined" startIcon={<BookmarkBorderIcon />}>
                Mark
            </Button>
            <Button disabled={disabled} sx={{ml: 1}} variant="outlined" startIcon={<VisibilityOffIcon />}>
                Don't show
            </Button>
        </Box>
    </>;
}

export default NotionActions;