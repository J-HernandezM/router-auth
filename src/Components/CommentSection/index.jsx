import { Paper } from '@mui/material';
import { BlogContext } from '../../Context/BlogContext';
import { useContext, useRef, useState } from 'react';
import { InputBase } from '@mui/material';
import { useAuth } from '../../auth'
import { v4 as uuidv4 } from 'uuid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './CommentSection.css'
import styled from '@emotion/styled';

const CommentSection = ({slug}) => {
    const auth = useAuth()
    const { blogData } = useContext(BlogContext) 
    const blogpost = blogData.find(post=> post.slug===slug)
    const commentInfo = {blogpost, auth}

    return (
        <Paper className='comments'>
                <NewComment commentInfo={commentInfo} />
                <div className='comments--box'>
                    {blogpost.comments.map((comment, index)=><Comment commentInfo={commentInfo} comment={comment} key={index}></Comment>
                    )}
                </div> 
        </Paper>
    );
};

const StyledInputBase = styled(InputBase)`
    display:flex;
    width: 90%;
    min-height: 32px;
    padding-left:14px;
    transition: min-height .3s ease-in-out;
    :focus-within {
        min-height: 50px ;
    }
`
const NewCommentForm = styled.form`
    display: flex;
    background-color:#242424;
    border-radius: 4px;
    margin-bottom: 20px;
`

const NewComment = ({commentInfo}) => {
    const { blogpost, auth } = commentInfo
    const { addComment } = useContext(BlogContext)
    const [commentContent, setCommentContent] = useState()

    const handleAdd = (event) => {
        const content = event.target.form[0].value
        const author = auth.user?.username
        const likes = 1
        const id = uuidv4()
        const date = '01/01/23'
        const newComment = {
            content, author, likes, id, date
        }
        addComment(blogpost, newComment)
        event.target.form[0].value = ''
        //para quitar el focus
        event.target.blur()
    }

    return(
        <NewCommentForm className="comments--area" onSubmit={(event)=>{event.preventDefault}}>
            <StyledInputBase 
                multiline
                maxRows={13}
                placeholder="Add a comment..."
                onKeyDown={(event)=>{if(event.key=='Enter'){handleAdd(event)}}}
            />
            <button type='submit' onClick={handleAdd} className='comment--confirm'>Confirm</button>
        </NewCommentForm>
    )
}

const Comment = ({comment, commentInfo}) => {
    const { blogpost, auth } = commentInfo
    const { editComment, deleteComment } = useContext(BlogContext)
    const handleEdit = (event) => {
    }
    const handleDelete = (event) => {
        let currentNode = event.target
        while(currentNode.nodeName!='BUTTON'){
            currentNode=currentNode.parentElement
        }
        const id = currentNode.dataset.id
        deleteComment(blogpost, id)
    }
    return(
        <div className='comment'>
            <div className='comment--header'>
                <p className='comment--author'>{comment.author}</p>
                <div className="comment--buttons-box">
                    <p className='comment--likes comment--btn'>{comment.likes}</p>
                    <button onClick={handleEdit} data-id={comment.id} type='button' className='comment--btn'><EditIcon fontSize='small' /></button>
                    <button onClick={handleDelete} data-id={comment.id} type='button' className='comment--btn'><DeleteIcon fontSize='small' /></button>
                </div>
            </div>
            <p className='comment--content'>{comment.content}</p>
            
        </div>
    )
}


export default CommentSection;