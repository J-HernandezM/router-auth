import React, { useContext } from 'react';
import { BlogContext } from '../../Context/BlogContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth';
import { Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonModal } from '../ButtonModal';

const backendRoles = [{username:'juan', role: 'student'}, {username:'wilson', role: 'admin'}, {username:'andrea', role: 'admin'}, {username:'mari', role: 'student'}]

//Challenge Roles & permissions
const editors = [{username:'juan1', role: 'editor'}, {username:'juan4', role: 'editor'}]
const betatests = [{username:'juan2', role: 'author'}, {username:'juan5', role: 'author'}]
const admins  = [{username:'juan3', role: 'admin'},{username:'juan6', role: 'admin'}]

const allRoles = [editors, betatests, admins]

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

    //Autorization
    const userExistInBackend= backendRoles.find(user=>user.username===auth.user?.username)
    const userCanDelete= auth.user?.username === blogpost?.author || userExistInBackend?.role==='admin'

    //Challenge, si tenemos varios arrays con diferentes roles como renderizo las funciones de cada rol
    let currentUser
    allRoles.some((roleArray)=>{
        currentUser = roleArray.find(user=>user.username===auth.user?.username)
        if(currentUser){return true}
    })
    const userSkills = (skills[currentUser?.role])
    
    //Hook useNavigate
    const navigate = useNavigate()
    function returnToBlog(){
        navigate('/blog')
        // navigate(-1)
    }
    if(!blogpost){
        return(
            <Paper className='post'>
                <h2 className='post--h2'>Nothing to see here...</h2>
            </Paper>
        )
    }else{
        return (
            <Paper className='post'>
                <h2 className='post--h2'>{blogpost?.title}</h2>
                <p className='post--content'>{blogpost?.content}</p>   
                <p className='post--author'>{blogpost?.author}</p>
                <div className={`skills ${!userSkills?'skill1':'allskills' }`} id={blogpost?.id}>
                    <button onClick={returnToBlog}><ArrowBackIcon fontSize='small' /></button>
                    {userSkills}
                </div>
            </Paper>
        );
    }
    
}

export  { Post };