import { Paper, TextField } from '@mui/material';
import { BlogContext } from '../../Context/BlogContext';
import { useContext } from 'react';
import { InputBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './CommentSection.css'
import styled from '@emotion/styled';

const CommentSection = ({slug}) => {
    const {blogData, addComment, editComment, deleteComment} = useContext(BlogContext) 
    const blogpost = blogData.find(post=> post.slug===slug)
    console.log(blogpost);

    const handleAdd = (event) => {
        console.log(event)
        // addComment(blogpost)
    }

    return (
        <Paper className='comments'>
                <NewComment />
                <div className='comments--box'>
                    {blogpost.comments.map((comment, index)=><Comment comment={comment} key={index}></Comment>
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

const NewComment = () => {
    return(
        <NewCommentForm className="comments--area">
            <StyledInputBase 
                multiline
                maxRows={13}
                placeholder="Add a comment..."
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <button type='button' className='comment--confirm'>Confirm</button>
        </NewCommentForm>
    )
}

const Comment = ({comment}) => {
    const handleEdit = () => {

    }
    const handleDelete = () => {

    }
    return(
        <div className='comment'>
            <div className='comment--header'>
                <p className='comment--author'>{comment.author}</p>
                <div className="comment--buttons-box">
                    <p className='comment--likes comment--btn'>{comment.likes}</p>
                    <button type='button' className='comment--btn'><EditIcon fontSize='small' /></button>
                    <button type='button' className='comment--btn'><DeleteIcon fontSize='small' /></button>
                </div>
            </div>
            <p className='comment--content'>{comment.content}</p>
            
        </div>
    )
}


export default CommentSection;