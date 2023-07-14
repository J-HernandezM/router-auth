import { useNavigate } from "react-router-dom";
import { blogData } from "../../Data/blogData"
import { BlogLink } from "../Blog"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AllPosts(){
    const navigate = useNavigate()
    function returnToBlog(){
        navigate('/blog')
    }
    return(
        <>
            <h1>All Posts</h1>
            <ul className='posts--grid'>
                {blogData.map((post)=>{
                    return (<BlogLink key={post.slug} post={post}/>)
                })}
            </ul>
            <button onClick={returnToBlog}><ArrowBackIcon fontSize='small' /></button>
        </>
    )
}
export {AllPosts}