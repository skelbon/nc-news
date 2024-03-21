
import { Grid, Typography } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import ArticleCard from "./ArticleCard"
import { getArticles, getUsers } from "../network/network";
import { UsersContext } from "./contexts";
import { UserContext } from "./contexts";


export default function Articles({filter, sortBy, order}){
    console.log(filter, sortBy, order)
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([])
    const {users, setUsers} = useContext(UsersContext)
    const {user } = useContext(UserContext)

 
    
    
    const fetchArticles = async (filter, sortBy, order) =>{
       
        setUsers(await getUsers())
        setArticles(await getArticles(filter, sortBy, order))
        setLoading(false)
    }
    
    useEffect(()=>{
        
        fetchArticles(filter, sortBy, order)
    }, [filter, sortBy, order])
    
 

   
    return (
    <>  
      {!user && <Typography style={{paddingBottom: '8px', color:'#ab851d'}} variant="subtitle2">Login to add comments and vote</Typography>}
        <Grid container spacing={1}>
            {loading && <div >Loading...</div>} 
        {
            articles.map((article)=>{
                return (
                    
                    <Grid key={(article.article_id).toString()} item xs={12} sm={6} md={6} lg={6} style={{padding:'3px'}}>
                        <ArticleCard key={(article.article_id + '@').toString()} article={article} users={users}/>
                    </Grid>
                )
            })

        }
        </Grid>
    </>
    )
}