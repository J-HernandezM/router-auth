import React from 'react';
import './Blog.css'
import { Link, Outlet } from 'react-router-dom';
import {blogData} from '../../Data/blogData'
import { Grid } from '@mui/material';
import { PostCard } from '../../Components/PostCard';


function Blog(props) {
    return (
        <>
            <h1>BlogPost</h1>
            <ul className='posts--grid'>
                {blogData.map(post=>(
                    <BlogLink key={post.slug} post={post}/>
                    ))}
            </ul>
            <Outlet />
        </>

    );
}

function BlogLink({post}){
    return(
        <li xs={6} md={4} lg={3}>
            <PostCard post={post}>
                <Link className='posts--link' to={`/blog/${post.slug}`}>
                    READ MORE
                </Link>
            </PostCard>
        </li>
    )
}

export { Blog };