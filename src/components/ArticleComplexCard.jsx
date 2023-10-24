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
  const [fullArticle, setFullArticle] = useState({})
  const [author, setAuthor] = useState({})

  const date = new Date(article.created_at) 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  useEffect (()=>{

    const matchAuthor = async ()=>{
        setAuthor (users.filter((user)=>user.username===article.author)[0])
    }
    const fetchFullArticle = async () =>{
        const articleResponse = await fetch(`https://skelbon-news-api.onrender.com/api/articles/${article.article_id}`)
        const fullArticle = await articleResponse.json()
        setFullArticle(fullArticle)
    }
     fetchFullArticle()
     matchAuthor()
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
        // alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
        {`${article.title}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="up vote article">
          <ThumbUpAltOutlinedIcon />
        </IconButton>
        <Chip label={`Votes: ${fullArticle.votes}`} variant="outlined" />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {`${fullArticle.body}`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}