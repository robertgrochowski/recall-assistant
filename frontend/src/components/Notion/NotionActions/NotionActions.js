import {Box, CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import './NotionActions.css';

const NotionActions = ({disabled}) => {
    return <>
        <Box className="leftAlignControls">
            <Button disabled={disabled} size="large" variant="contained" startIcon={<CheckIcon />}>
                Przeczytane
            </Button>
            <Button disabled={disabled} sx={{ml: 1}} variant="outlined" startIcon={<ReadMoreIcon />}>
                Więcej
            </Button>
        </Box>
        <Box className="rightAlignControls">
            <Button disabled={disabled} variant="outlined" startIcon={<BookmarkBorderIcon />}>
                Oznacz
            </Button>
            <Button disabled={disabled} sx={{ml: 1}} variant="outlined" startIcon={<VisibilityOffIcon />}>
                Nie pokazuj
            </Button>
        </Box>
    </>;
}

export default NotionActions;