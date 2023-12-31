import React, { useContext } from 'react';
import { BlogContext } from '../../Context/BlogContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth';
import { Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ButtonModal } from '../ButtonModal';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CommentSection from '../CommentSection';


const skills = {
    editor: 
                <ButtonModal type={'edit'}><EditIcon fontSize='small' /></ButtonModal>,
    author: <>
                <ButtonModal type={'edit'}><EditIcon fontSize='small' /></ButtonModal>
                <ButtonModal type={'delete'}><DeleteIcon fontSize='small' /></ButtonModal>
            </>,
    admin:  <>
                <ButtonModal type={'edit'}><EditIcon fontSize='small' /></ButtonModal>
                <ButtonModal type={'delete'}><DeleteIcon fontSize='small' /></ButtonModal>
                <ButtonModal type={'add'}><AddCircleOutlineIcon fontSize='small' /></ButtonModal>
            </>
}

function Post(props) {
    const {blogData} = useContext(BlogContext) 
    const auth = useAuth()
    const {slug} = useParams()
    const blogpost = blogData.find(post=> post.slug===slug)
    
    //Challenge, si tenemos varios arrays con diferentes roles como renderizo las funciones de cada rol
    let userSkills
    if(auth.user?.role){
        userSkills = skills[auth.user.role]
    }else{
        //Si no es el autor quitale los botones de autor. Si es el autor ponselos
        const isAuthor= auth.user?.username === blogpost?.author
        if(!isAuthor && !!auth.user){
            skills.author = <></>
        }else if (isAuthor && !!auth.user ){
            skills.author =
            <>
                <ButtonModal type={'edit'}><EditIcon fontSize='small' /></ButtonModal>
                <ButtonModal type={'delete'}><DeleteIcon fontSize='small' /></ButtonModal>
            </>
            userSkills = skills.author
        }
    }
    
    //Hook useNavigate
    const navigate = useNavigate()
    function returnToBlog(){
        navigate('/blog')
    }
    if(!blogpost){
        return(
            <Paper className='post post--nothing'>
                <h2 className='post--h2'>Nothing to see here...</h2>
            </Paper>
        )
    }else{
        return (
            <>
                <Paper className='post'>
                    <div className='post--up'>
                        <h2 className='post--h2'><>{blogpost?.title}</></h2>
                        <ReactMarkdown className='post--content'>
                            {blogpost?.content}
                        </ReactMarkdown>
                    </div>  
                    <p className='post--author'>{blogpost?.author}</p>
                    <div className={`skills ${!userSkills?'skill1':'allskills' }`} id={blogpost?.id}>
                        <button onClick={returnToBlog}><ArrowBackIcon fontSize='small' /></button>
                        {userSkills}
                    </div>
                </Paper>
                <CommentSection slug={slug}/>
            </>
        );
    }
    
}

export  { Post };