import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { UserContext } from './contexts';
import { deleteComment } from '../network/network';

export default function CommentCard({comment, users, comments, setComments}){
    
    const thisUser = users.find((user)=>user.username===comment.author)
    const date = new Date(comment.created_at) 
    const {user} = useContext(UserContext)
    
    
    const handleDeleteComment = async ()=>{
        const res = await deleteComment(comment.comment_id)
        
        if (await res.status === 204){
            const index = comments.findIndex((item)=>comment.comment_id===item.comment_id)
            comments.splice(index,1)
            console.log(comments)
            setComments([...comments])
        }
    }
    
    const CommentBin = ()=>{
        return (
            <IconButton
            type="button" 
                // sx={{ marginLeft: '80', p: '10px' }} 
                // aria-label="send comment"
                onClick={handleDeleteComment}
            >
                <DeleteOutlinedIcon />
            </IconButton>
        )
    }
    
    return (
        <Card raised={false}>
            <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={`${thisUser.avatar_url}`}>
                    {comment.author.charAt(0).toUpperCase()}
                </Avatar>
                }
                title={`${comment.author}`}
                subheader={`Created: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                />
            { user===comment.author ? <CommentBin /> : ''} 
            { user===comment.author ? <Typography variant='caption'>...delete   </Typography> : ''} 
            
            <CardContent>
                <Typography variant='body2'>
                    {`${comment.body}`}
                </Typography>
            </CardContent>
            
        </Card>
    )
}

           
