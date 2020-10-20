import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { savePost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ addRequestStatus, setAddRequestStatus ] = useState('idle')

    const dispatch = useDispatch()

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const userOptions = users.map(user => (
        <option value={user.id} key={user.id}>{user.name}</option>
    ))

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePost = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    savePost({title, content, user: userId})
                )
                unwrapResult(resultAction)
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text" 
                    id="postTitle" 
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <input 
                    type="text" 
                    id="postContent" 
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePost} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    );
}
 
export default AddPostForm;