import { Typography, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"



export default function Articles(){
    
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([])
    
    useEffect(()=>{

        const fetchArticles = async () =>{
            const articlesResponse = await fetch("https://skelbon-news-api.onrender.com/api/articles")
            const articles = await articlesResponse.json()
            console.log(articles)
            setArticles(articles)
            setLoading(false)
        }
         fetchArticles()
    }, [])
    
    if (loading) return (<div>Loading</div>)

    
    return (
    <>
        <Grid container spacing={1}>
        {
            articles.map((article)=>{
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={article.article_id} style={{padding:'3px'}}>
                        <ArticleCard  article={article}/>
                    </Grid>
                )
            })

        }
        </Grid>
    </>
    )
}