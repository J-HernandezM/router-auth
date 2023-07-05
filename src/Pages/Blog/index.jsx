import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {blogData} from '../../Data/blogData'


function Blog(props) {
    return (
        <>
            <h1>BlogPost</h1>
                <Outlet />
            <ul>
                {blogData.map(post=>(
                    <BlogLink key={post.id} post={post}/>
                    ))}
            </ul>
        </>

    );
}

function BlogLink({post}){
    return(
        <li>
            <Link to={`/blog/${post.slug}`}>
                {post.title}
            </Link>
        </li>
    )
}

export { Blog };