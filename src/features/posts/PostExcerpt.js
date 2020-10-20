import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { selectPostById } from './postsSlice';
import { useSelector } from 'react-redux';

const PostExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))
    
    return (  
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date}/>
            <p>{post.content.substring(0, 100)}</p>
            <br/>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    );
}

export default PostExcerpt;