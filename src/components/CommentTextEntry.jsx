import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

export default function CommentTextEntry(){
    return (
        <Paper 
            variant='outlined'
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Leave a moody comment..."
                inputProps={{ 'aria-label': 'leave a comment' }}
            />
        
            <IconButton type="button" sx={{ marginLeft: '80', p: '10px' }} aria-label="search">
                <SendIcon />
            </IconButton>
        </Paper>
    )
}