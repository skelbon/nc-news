import { useNavigate} from "react-router-dom";
import { Typography, Button } from "@mui/material";


export default function PageNotFound(){

    const navigate = useNavigate()
    
    return(
        <>
        <Typography>
            We don't have a page at this location! Let me take you back to our home page...
        </Typography>
        <br />
    
        <Button
            onClick={()=>{
                navigate('/')
            }}
        >Take me!</Button>
        </>
    )

}