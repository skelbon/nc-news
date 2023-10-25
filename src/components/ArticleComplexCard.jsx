import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { Chip } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentCard from './CommentCard';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import NetworkAlert from './NetworkErrorAlert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ArticleCard({article, users}) {

  const [expanded, setExpanded] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(false)
  const [fullArticle, setFullArticle] = useState({})
  const [author, setAuthor] = useState({})
  const [comments, setComments] = useState([])
  const [articleVotes, setArticleVotes] = useState(article.votes)
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoteError, setIsVoteError] = useState(null)
  const date = new Date(article.created_at) 
  
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleCommentsExpandClick = () => {
    setCommentsExpanded(!commentsExpanded);
  };
  
// TODO Separate network call functions to seperate file
  const matchAuthor = async ()=>{
      setAuthor (users.filter((user)=>user.username===article.author)[0])
  }
  const fetchFullArticle = async () =>{
      const articleResponse = await fetch(`https://skelbon-news-api.onrender.com/api/articles/${article.article_id}`)
      const fullArticle = await articleResponse.json()
      setFullArticle(fullArticle)
  }
  const fetchArticleComments = async () =>{
      const articleCommentsResponse = await fetch(`https://skelbon-news-api.onrender.com/api/articles/${article.article_id}/comments`)
      const articleComments = await articleCommentsResponse.json()
      setComments(await articleComments.comments)
  }

  const handleArticleVote = ()=>{
    let increment 
    if (hasVoted)
      increment = -1  
    else 
      increment = 1
    setArticleVotes((currentVote)=> currentVote+increment)
    setHasVoted((voted)=> !voted)
    
    axios.patch(`https://skelbon-news-api.onrender.com/api/articles/${article.article_id}`, { inc_votes : increment }).catch((err)=>{setIsVoteError('Network error - unable to update vote - try later')})
  }
  
  const renderCommentCards = ()=>{
    return (
      comments.map((comment)=> {

        return (
          <>
            <CommentCard key={comment.comment_id} comment={comment} users={users}/> 
            <br />
          </>
        )
      })
    )
  }

  useEffect (()=>{
     fetchFullArticle()
     matchAuthor()
     fetchArticleComments()
     // TODO Error handling 
}, [])

  return (
    <Card sx={{ maxWidth:1200, marginLeft: 'auto', marginRight: 'auto' }}>
      <CardHeader
        avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={`${author.avatar_url}`}>
              {article.author.charAt(0).toUpperCase()}
            </Avatar>
          }
        
        title={`Author: ${article.author}`}

        subheader={`Created: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${article.article_img_url}`}
        alt="Article image"
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
        {`${article.title}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="up vote article" onClick={handleArticleVote}>
          <ThumbUpAltOutlinedIcon color={ hasVoted ? `disabled` : 'enabled'}/>
        </IconButton>
        <Chip label={`Votes: ${articleVotes}`} variant="outlined" />
        <Typography variant='h6' sx={{marginLeft: 'auto'}}>Read</Typography>
        <ExpandMore
          sx={{marginLeft: '0'}}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
          {isVoteError ? <NetworkAlert message={isVoteError} severity={'warning'} setIsVoteError={setIsVoteError}/> : ''}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {`${fullArticle.body}`}
          </Typography>
        </CardContent>
      </Collapse>
      <ExpandMore
          expand={commentsExpanded}
          onClick={handleCommentsExpandClick}
          aria-expanded={commentsExpanded}
          aria-label="show comments"
        >
          <ExpandMoreIcon />
        </ExpandMore>
          <Typography variant='caption'>Comments</Typography>
      <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {renderCommentCards()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}