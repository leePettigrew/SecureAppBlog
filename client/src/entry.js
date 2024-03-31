import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";

export default function Entry({_id,title,summary,cover,content,createdAt,author}) {
    return(
        <div className="entry">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:3500/'+cover} alt=""></img>
                </Link>
                
            </div>
            <div className="text">
            <Link to={`/post/${_id}`}>
                <h2>{title}</h2>
            </Link>
            <p className="info">
                <a className="author">{author.username}</a>
                <time>{formatISO9075(createdAt)}</time>
            </p>
            <p className="description">{summary}</p>
            </div>
        </div>
    );
}