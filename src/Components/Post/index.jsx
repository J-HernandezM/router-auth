import React from 'react';
import { blogData } from '../../Data/blogData';
import { useNavigate, useParams } from 'react-router-dom';


function Post(props) {
    const {slug} = useParams()
    const blogpost = blogData.find(post=> post.slug===slug)

    //Hook useNavigate
    const navigate = useNavigate()
    function returnToBlog(){
        navigate('/blog')
        // navigate(-1)
    }

    return (
        <div className='post'>
            <h2>{blogpost.title}</h2>
            <p>{blogpost.content}</p>   
            <p>{blogpost.author}</p>
            <button onClick={returnToBlog}>Volver al blog</button>
        </div>
    );
}

export  { Post };