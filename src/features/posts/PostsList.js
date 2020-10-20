import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    fetchPosts,
    selectPostIds
} from './postsSlice';

import PostExcerpt from './PostExcerpt';

const PostsList = () => {
    const dispatch = useDispatch()
    const orderedPostIds = useSelector(selectPostIds)
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    const renderedPosts = (postIdsToRender) => {
        return postIdsToRender.map(postId => (
            <PostExcerpt key={postId} postId={postId} />
        ))
    }
    
    let content

    if (postStatus === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if (postStatus === 'succeeded') {
        content = renderedPosts(orderedPostIds)
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
}
 
export default PostsList;