import {Chip, Grid, Typography} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import TagIcon from '@mui/icons-material/Tag';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MenuBook from "@mui/icons-material/MenuBook";

const NotionBody = ({notion}) => {
    let date = notion.addedDate ? new Date(notion.addedDate) : "";
    return <>
        <Grid container direction="row" alignItems="center" spacing={1}>
            {date && <Grid item>
                <Chip size="small" label={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} icon={<TodayIcon fontSize="small"/>} />
            </Grid>}
            {!isNaN(notion.viewsAmount) && <Grid item>
                <Chip size="small" label={notion.viewsAmount} icon={<RemoveRedEyeIcon fontSize="small"/>} />
            </Grid>}
            {notion.tags && notion.tags.map((val, i) => (
                <Grid item key={i}>
                    {val && <Chip size="small" label={val} icon={<TagIcon fontSize="small"/>} />}
                </Grid>
                ))
            }
        </Grid>
        <Typography variant="h4" component="div" mt={1}>
            {notion?.header}
        </Typography>
        <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
                <MenuBook fontSize="small"/>
            </Grid>
            <Grid item>
                <Typography variant="overline">{notion?.source}</Typography>
            </Grid>
        </Grid>
        <Typography variant="body1" align="justify" pt={1}>
            <div dangerouslySetInnerHTML={{__html: notion?.content}}></div>
        </Typography>
    </>;
}
export default NotionBody;