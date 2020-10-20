import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import { selectPostById } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const SinglePostPage = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state => selectPostById(state, postId))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    } else {
        return (  
            <section>
                <article className="post">
                    <h2>{post.title}</h2>
                    <h3>
                        <PostAuthor userId={post.user} />
                    </h3>
                    <TimeAgo timestamp={post.date}/>
                    <p className="post-content">{post.content}</p>
                    <br/>
                    <ReactionButtons post={post} />
                    <Link to={`/edit/${post.id}`} className="button">
                        Edit Post
                    </Link>
                </article>
            </section>
        )
    }
}
 
export default SinglePostPage;