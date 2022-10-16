import {Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";

const NotionContent = ({thumbnail, content, images}) => {

    const [currentPage, setCurrentPage] = useState(0);
    const notionRef = useRef();

    useEffect(()=>{
        setCurrentPage(0);
    }, [content])

    const onClicked = event => {

        const notionBounding = notionRef.current.getBoundingClientRect();
        const notionX = notionBounding.x;
        const notionWidth = notionBounding.width;
        const notionEndX = notionWidth + notionX;
        const clickX = event.clientX;
        const percent = (notionEndX-clickX) / notionWidth;

        if(percent > 0.5) {
            setCurrentPage(Math.max(0, currentPage-1));
        } else {
            setCurrentPage(Math.min(images.length, currentPage+1));
        }
    }

    const mainContent = () =>
        <>
            {thumbnail && <img alt="thumbnail" style={{float: "right", width:"150px", height:"150px" }} src={thumbnail} />}
            <Typography component={'span'} variant="body1" align="justify" dangerouslySetInnerHTML={{__html: content}}></Typography>
        </>;

    const drawImage = () =>
        <Box display="flex" alignItems="center" justifyContent="center">
            <img alt="notion" style={{height: "260px"}} src={images[currentPage-1]}/>
        </Box>


    return <div ref={notionRef} style={{minHeight:"150px"}} onClick={onClicked}>
        {currentPage === 0 && mainContent()}
        {currentPage > 0 && drawImage()}
    </div>
}
export default NotionContent;