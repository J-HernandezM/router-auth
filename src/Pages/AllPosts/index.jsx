import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../Context/BlogContext";
import { BlogLink } from "../Blog"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from "react";

function AllPosts(){
    const {blogData} = useContext(BlogContext) 

    const navigate = useNavigate()
    function returnToBlog(){
        navigate('/blog')
    }
    return(
        <>
            <h1>All Posts</h1>
            <ul className='posts--grid'>
                {blogData.slice(0).reverse().map((post)=>{
                    return (<BlogLink key={post.slug} post={post}/>)
                })}
            </ul>
            <button onClick={returnToBlog}><ArrowBackIcon fontSize='small' /></button>
        </>
    )
}
export {AllPosts}