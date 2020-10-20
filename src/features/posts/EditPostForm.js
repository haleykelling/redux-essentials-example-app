import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated, selectPostById } from './postsSlice';

const EditPostForm = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state => selectPostById(state, postId))
    
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onEditPost = () => {
        if (title && content) {
            dispatch(postUpdated({
                id: postId,
                title,
                content
            }))
            history.push(`/posts/${postId}`)
        }
    }

    return (  
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text" 
                    id="postTitle" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="postContent">Post Content:</label>
                <input 
                    type="text" 
                    id="postContent" 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button type="button" onClick={onEditPost}>Edit Post</button>
            </form>
        </section>
    );
}
 
export default EditPostForm;