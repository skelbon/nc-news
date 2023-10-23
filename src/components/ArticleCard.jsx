import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ArticleCard({article}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
        sx={{ height: 140 }}
        image={`${article.article_img_url}`}
        title={`${article.title}`}
    />
    <CardContent>
        <Typography gutterBottom variant="h7" component="div">
        {`${article.title}`}
        </Typography>
        
    </CardContent>
    <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
    </CardActions>
    </Card>

  );
}