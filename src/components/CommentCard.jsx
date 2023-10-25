import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Typography } from '@mui/material';
export default function CommentCard({comment, users}){
    
    const thisUser = users.filter((user)=>user.username===comment.author)
    const date = new Date(comment.created_at) 
    console.log(thisUser)

    return (
        <>
            <Card variant='raised'>
                <CardHeader 
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={`${thisUser[0].avatar_url}`}>
                      {/* {article.author.charAt(0).toUpperCase()} */}
                    </Avatar>
                  }
                title={`${comment.author}`}
                subheader={`Created: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                />
                <CardContent>
                    <Typography variant='body2'>
                        {`${comment.body}`}
                    </Typography>
                </CardContent>
            </Card>
            
        </>
    )
}

           
