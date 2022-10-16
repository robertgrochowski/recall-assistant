import {Chip, Grid, Typography} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import TagIcon from '@mui/icons-material/Tag';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MenuBook from "@mui/icons-material/MenuBook";
import NotionContent from "../NotionContent/NotionContent"

const NotionBody = ({notion}) => {
    const date = notion.timestamp ? new Date(notion.timestamp) : "";
    const thumbnail = notion.images[0];
    const images = notion.images?.slice(1);

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
        <div>
            {notion && <NotionContent content={notion.content} images={images} thumbnail={thumbnail}/>}
        </div>
    </>;
}
export default NotionBody;