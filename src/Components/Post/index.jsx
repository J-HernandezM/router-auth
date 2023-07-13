import React from 'react';
import { blogData } from '../../Data/blogData';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth';
import { Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const backendRoles = [{username:'juan', role: 'student'}, {username:'wilson', role: 'admin'}, {username:'andrea', role: 'admin'}, {username:'mari', role: 'student'}]

//Challenge Roles & permissions
const editors = [{username:'juan1', role: 'editor'}, {username:'juan4', role: 'editor'}]
const betatests = [{username:'juan2', role: 'betatest'}, {username:'juan5', role: 'betatest'}]
const admins  = [{username:'juan3', role: 'admin'},{username:'juan6', role: 'admin'}]

const allRoles = [editors, betatests, admins]

const skills = {
    editor: <button><EditIcon fontSize='small' /></button>,
    author: <button><ArrowBackIcon fontSize='small' /></button>,
    admin:  <>
                <button><EditIcon fontSize='small' /></button>
                <button><DeleteIcon fontSize='small' /></button>
                <button><AddCircleOutlineIcon fontSize='small' /></button>
            </>
}

function Post(props) {
    const auth = useAuth()
    const {slug} = useParams()
    const blogpost = blogData.find(post=> post.slug===slug)

    //Autorization
    const userExistInBackend= backendRoles.find(user=>user.username===auth.user?.username)
    const userCanDelete= auth.user?.username === blogpost.author || userExistInBackend?.role==='admin'

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

    return (
        <Paper className='post'>
            <h2 className='post--h2'>{blogpost.title}</h2>
            <p className='post--content'>{blogpost.content}</p>   
            <p className='post--author'>{blogpost.author}</p>
            {/* {(userExistInBackend && userCanDelete) && <button>Eliminar</button>} */}
            <div className='skills'>
                <button onClick={returnToBlog}><ArrowBackIcon fontSize='small' /></button>
                {userSkills}
            </div>
        </Paper>
    );
}

export  { Post };