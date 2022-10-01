import {Chip, Grid, Typography} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import TagIcon from '@mui/icons-material/Tag';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MenuBook from "@mui/icons-material/MenuBook";

const NotionBody = ({notion}) => {
    let date = notion.addedDate ? new Date(notion.addedDate) : "";
    return <>
        <Grid container direction="row" alignItems="center" spacing={1} sx={{paddingTop:0}}>

        </Grid>
        <Typography variant="h4" component="div" mt={0.4}>
            {notion?.header}
        </Typography>
        <Grid container direction="row" justifyContent="space-between">
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" spacing={1} pt={0.5}>
                    <Grid item>
                        <MenuBook fontSize="small"/>
                    </Grid>
                    <Grid item>
                        <Typography variant="overline">{notion?.source}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-end" spacing={1} pt={0.5}>
                    {notion.tags && notion.tags.map((val, i) => (
                        <Grid item key={i}>
                            {val && <Chip size="small" label={val} icon={<TagIcon fontSize="small"/>} />}
                        </Grid>
                    ))
                    }
                    {date && <Grid item>
                        <Chip size="small" label={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} icon={<TodayIcon fontSize="small"/>} />
                    </Grid>}
                    {!isNaN(notion.viewsAmount) && <Grid item>
                        <Chip size="small" label={notion.viewsAmount} icon={<RemoveRedEyeIcon fontSize="small"/>} />
                    </Grid>}
                </Grid>
            </Grid>
        </Grid>

        <Typography component={'span'} variant="body1" align="justify" pt={0}>
            <div dangerouslySetInnerHTML={{__html: notion?.content}}></div>
        </Typography>
    </>;
}
export default NotionBody;