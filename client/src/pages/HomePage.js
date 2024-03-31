import { useEffect, useState } from "react";
import Entry from "../entry";


export default function HomePage() {

    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3500/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);
    return(
        <>
            {posts.length > 0 && posts.map(post => (
                <Entry {...post}/>
            ))}
        </>
    );
}