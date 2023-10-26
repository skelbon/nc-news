import axios from "axios";

export const getArticles = async ()=>{
    const articles = await axios.get("https://skelbon-news-api.onrender.com/api/articles")
    return articles.data
}

export const getArticle = async (article_id)=>{
    const article = await axios.get(`https://skelbon-news-api.onrender.com/api/articles/${article_id}`)
    return article.data
}
export const getUsers = async ()=>{
    const users = await axios.get(`https://skelbon-news-api.onrender.com/api/users`)
    return users.data
}

export const getComments = async (article_id)=>{
    const comments = await axios.get(`https://skelbon-news-api.onrender.com/api/articles/${article_id}/comments`)
    return comments.data.comments
}

export const patchArticleVotes = async (article_id, increment_value, setIsVoteError)=>{
    axios.patch(`https://skelbon-news-api.onrender.com/api/articles/${article_id}`, { inc_votes : increment_value }).catch((err)=>{setIsVoteError('Network error - unable to update vote - try later')})
}

export const postComment = async (article_id, user, comment_content)=>{
    return axios.post(`https://skelbon-news-api.onrender.com/api/articles/${article_id}/comments`, { "body" : comment_content, "username" : user }).catch((err)=>console.log(err))
    
}

export const deleteComment = async (comment_id)=>{
    return axios.delete(`https://skelbon-news-api.onrender.com/api/comments/${comment_id}`).catch((err)=>console.log(err))
    
}

