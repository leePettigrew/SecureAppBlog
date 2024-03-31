import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
    
const {id} = useParams();
const [postInfo, setPostInfo] = useState(null);
const {userInfo} = useContext(UserContext);

   useEffect(() => {
    fetch(`http://localhost:3500/post/${id}`)
    .then(response => {
        response.json().then(postInfo => {
            setPostInfo(postInfo);
        });
    });
   }, []);


   if (!postInfo) return '';

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(postInfo.createdAt)}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div>
                   <a className="" href="">Edit Post</a> 
                </div>

            )}
            <div className="image">
                <img src={`http://localhost:3500/${postInfo.cover}`} alt=""/>
            </div>
            
            
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>

    )
}