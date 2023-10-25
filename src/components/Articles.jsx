
import { Typography, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleComplexCard"


import * as React from 'react';
export default function Articles(){
    
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([])
    const [users, setUsers] = useState({})
    
    
    const fetchArticles = async () =>{
        const articlesResponse = await fetch("https://skelbon-news-api.onrender.com/api/articles")
        const articles = await articlesResponse.json()
        const usersResponse = await fetch(`https://skelbon-news-api.onrender.com/api/users`)
        const users = await usersResponse.json()
        setUsers(await users)
        setArticles(articles)
        setLoading(false)
    }
    
    useEffect(()=>{
        fetchArticles()
    }, [])
    
    if (loading) return (<div>Loading. Please be patient, this can take a while while the server spins up if it's been idle for a while...</div>)

    
    return (
    <>
        <Grid container spacing={1}>
        {
            articles.map((article)=>{
                return (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={article.article_id} style={{padding:'3px'}}>
                        <ArticleCard article={article} users={users}/>
                    </Grid>
                )
            })

        }
        </Grid>
    </>
    )
}