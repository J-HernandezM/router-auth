import React, { useContext } from 'react';
import './Blog.css'
import { Link, Outlet } from 'react-router-dom';
import {BlogContext} from '../../Context/BlogContext'
import { PostCard } from '../../Components/PostCard';
import { Button } from '@mui/material';
import {FirstPost} from '../../Components/FirstPost'
import { useAuth } from '../../auth';


function Blog(props) {
    const auth = useAuth()
    const {blogData, isEmpty} = useContext(BlogContext) 
    return (
        <>
            <h1>BlogPost</h1>
            <ul className='posts--grid'>
                {!isEmpty &&  blogData.map((post, index)=>{
                    if(index<=5){
                        return (<BlogLink key={post.id} post={post}/>)
                    }
                }) }
                {(isEmpty && auth?.user) && <FirstPost />}
                {(isEmpty && !auth.user) && <h2>Currently there is no posts, login to create one</h2>}
            </ul>
            {!isEmpty && <Button component={Link} sx={{width:'50%', marginBottom:'30px', maxWidth:'430px'}} variant="contained" to={`/blog/allPosts`}>Check all posts</Button>}

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