import {CardContent, Chip, Divider, Grid, Typography} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MenuBook from "@mui/icons-material/MenuBook";

const NotionBody = ({notion}) => {
    console.log(notion)
    return <>
        <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
                <Chip size="small" label="27 paź 2021" icon={<TodayIcon fontSize="small"/>} />
            </Grid>
            <Grid item>
                <Chip size="small" label="2" icon={<RemoveRedEyeIcon fontSize="small"/>} />
            </Grid>
        </Grid>
        <Typography variant="h4" component="div" mt={1}>
            {notion?.header}
        </Typography>
        <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
                <MenuBook fontSize="small"/>
            </Grid>
            <Grid item>
                <Typography variant="overline">National Geographic: 1000 lat historii Ameryki</Typography>
            </Grid>
        </Grid>
        <Typography variant="body1" align="justify" pt={1}>
            {notion?.content}
        </Typography>
    </>;
}
export default NotionBody;