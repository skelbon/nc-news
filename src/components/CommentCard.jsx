import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

export default function CommentCard({comment, users}){
    
    const thisUser = users.filter((user)=>user.username===comment.author)

    console.log(thisUser)

    return (
        <>
            <Card>
                <CardHeader 
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={`${thisUser[0].avatar_url}`}>
                      {/* {article.author.charAt(0).toUpperCase()} */}
                    </Avatar>
                  }
                />
            </Card>
        </>
    )
}