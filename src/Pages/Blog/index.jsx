import React from 'react';
import './Blog.css'
import { Link, Outlet } from 'react-router-dom';
import {blogData} from '../../Data/blogData'
import { PostCard } from '../../Components/PostCard';
import { Button } from '@mui/material';


function Blog(props) {
    return (
        <>
            <h1>BlogPost</h1>
            <ul className='posts--grid'>
                {blogData.map((post, index)=>{
                    if(index<=5){
                        return (<BlogLink key={post.slug} post={post}/>)
                    }
                })}
            </ul>
            <Button component={Link} sx={{width:'50%', marginBottom:'30px'}} variant="contained" to={`/blog/allPosts`}>Check all posts</Button>
            <Outlet />
        </>

    );
}

function BlogLink({post}){
    return(
        <li>
            <PostCard post={post}>
                <Link className='posts--link' to={`/blog/${post.slug}`}>
                    READ MORE
                </Link>
            </PostCard>
        </li>
    )
}

export { Blog, BlogLink };