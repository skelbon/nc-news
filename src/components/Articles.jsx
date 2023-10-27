
import { Grid } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import ArticleCard from "./ArticleCard"
import { getArticles, getUsers } from "../network/network";
import { UsersContext } from "./contexts";


export default function Articles({filter}){
    
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([])
    const {users, setUsers} = useContext(UsersContext)
    
    
    
    const fetchArticles = async (filter) =>{

        setUsers(await getUsers())
        setArticles(await getArticles(filter))
        setLoading(false)
    }
    
    useEffect(()=>{
        fetchArticles(filter)
    }, [filter])
    
    if (loading) return (<div>Loading. Please be patient, this can take a while while the server spins up if it's been idle for a while...</div>)

   
    return (
    <>  
      
        <Grid container spacing={1}>
        {
            articles.map((article)=>{
                return (
                    <Grid key={article.article_id} item xs={12} sm={6} md={6} lg={6} style={{padding:'3px'}}>
                        <ArticleCard article={article} users={users}/>
                    </Grid>
                )
            })

        }
        </Grid>
    </>
    )
}