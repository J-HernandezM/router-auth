import { Paper } from '@mui/material';
import { BlogContext } from '../../Context/BlogContext';
import { useContext, useRef, useState } from 'react';
import { InputBase } from '@mui/material';
import { useAuth } from '../../auth'
import { v4 as uuidv4 } from 'uuid'
import { ModalContext } from '../../Context/ModalContext';
import { DeleteCommentButton } from './DeleteCommentButton';
import { EditCommentButton } from './EditCommentButton';
import styled from '@emotion/styled';
import './CommentSection.css'
import { Link } from 'react-router-dom';

const CommentSection = ({slug}) => {
    const { blogData } = useContext(BlogContext) 
    const blogpost = blogData.find(post=> post.slug===slug)

    return (
        <Paper className='comments'>
                <NewComment blogpost={blogpost} />
                <div className='comments--box'>
                    {blogpost.comments.map((comment, index)=><Comment blogpost={blogpost} comment={comment} key={index}></Comment>
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
    padding-right:10px;
`

const NewComment = ({blogpost, editMode, comment, setEditMode}) => {
    const { setModalOn } = useContext(ModalContext)
    const { addComment, editComment } = useContext(BlogContext)
    const auth = useAuth()

    const handleAdd = (event) => {
        if(!auth.user){
            setModalOn(true)
        }else if(!!auth.user){
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
    }
    const handleEdit = (event) => {
        const content = event.target.form[0].value
        const newComment = {...comment}
        newComment.content = content
        newComment.author = auth.user?.username + ' edited'
        editComment(blogpost, newComment, comment.id)
        setEditMode(false)
    }

    return(
        <>
            <NewCommentForm className={editMode?'comments--editMode':''}>
                <StyledInputBase
                    multiline
                    maxRows={13}
                    placeholder="Add a comment..."
                    onKeyDown={(event)=>{
                        if(event.key=='Enter'){
                            if(editMode){handleEdit(event)
                            }else{handleAdd(event)}
                        }}}
                />
                <button type='button' onClick={(event)=>{
                    if(editMode){handleEdit(event)
                    }else{handleAdd(event)}
                }} className='comment--confirm'>Confirm</button>
            </NewCommentForm>
            
        </>
    )
}

const Comment = ({comment, blogpost}) => {
    const auth = useAuth()
    const [ editMode, setEditMode ] = useState(false)
    const canEdit = (!!auth.user && (auth.user.role=='admin' || auth.user.role=='editor' || comment.author===auth.user.username))?true:false
    const canDelete = (!!auth.user && (auth.user.role=='admin' || comment.author===auth.user.username))?true:false
    const slug = `${comment.author.toLowerCase().replaceAll(' ', '-')}`

    return(
        <div className='comment'>
            <div className='comment--header'>
                <Link to={`/profile/${slug}`} className='comment--author'>{comment.author}</Link>
                <div className="comment--buttons-box">
                    <p className='comment--likes comment--btn'>{comment.likes}</p>
                    {canEdit && <EditCommentButton comment={comment} setEditMode={setEditMode}/>}
                    {canDelete && <DeleteCommentButton comment={comment}/>}
                </div>
            </div>
            {!editMode && <p className='comment--content'>{comment.content}</p>}
            {editMode && <NewComment blogpost={blogpost} comment={comment} editMode={true} setEditMode={setEditMode}></NewComment>}
        </div>
    )
}


export default CommentSection;