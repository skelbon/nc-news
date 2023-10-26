import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { postComment } from '../network/network';

export default function CommentTextEntry({user, article_id, setComments}){
    
    const [comment, setComment] = useState('')
    const [sent, setSent] = useState(true)
    
    const handleSendComment = async ()=>{
        
        setSent(false) 
        const res = await postComment(article_id, user, comment)
        if (await res.status === 200){
            setSent(true)
            setComments((currentComments)=>[res.data, ...currentComments])
            setComment('')
        }
    }
    
    
    return (
        <Paper 
            variant='outlined'
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
        >
            <InputBase
                disabled={!sent}
                key={article_id+9999}
                sx={{ ml: 1, flex: 1 }}
                placeholder={!sent ? `Sending...` : `Leave a comment...`}
                inputProps={{ 'aria-label': 'leave a comment' }}
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                onKeyDown={(e)=>{ 
                    if(e.key==='Enter') {
                        handleSendComment()
                        e.preventDefault()
                    }
                }}
            />
        
            <IconButton 
                disabled={!sent}
                type="button" 
                sx={{ marginLeft: '80', p: '10px' }} 
                aria-label="send comment"
                onClick={handleSendComment}>
                <SendIcon />
            </IconButton>
        </Paper>
    )
}