import { TextField } from '@mui/material'
import './Modal.css'
import { useContext } from 'react'
import { BlogContext } from '../../Context/BlogContext'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../../auth'
import { useNavigate, useParams } from 'react-router-dom'

function Modal({type, setModalOn}){
    const auth = useAuth()
    const navigate = useNavigate()
    const {pushData, blogData, editData} = useContext(BlogContext)
    const {slug} = useParams()
    const currentPost = blogData.find(post=> post.slug===slug)

    const handleConfirm = (event) => {
        const title = event.target.form[0].value
        const content = event.target.form[2].value
        const slug = title.toLowerCase().replaceAll(' ', '-')
        const newPost = {
            id: uuidv4(),
            title: title,
            slug: slug,
            content: content,
            author: auth.user?.username
        }
        setModalOn(false)
        if(type==='add'){
            pushData(newPost)
        }else if (type==='edit'){
            editData(newPost, currentPost.id)
            navigate(`/blog/${slug}`)
        }
    }
    const handleCancel = () => {setModalOn(false)}

    return(
        <div className="modal--bg">
            <form className="modal--container">
                <h2 className='modal--title'>{type==='add'?'Create a new Post':'Edit the post'}</h2>
                <TextField 
                    sx={{width:'100%'}} 
                    label="Title" 
                    variant="outlined" 
                    defaultValue={type==='edit'?currentPost.title:null}
                />
                <TextField
                    label="Content"
                    multiline
                    maxRows={13}
                    placeholder="You can use Markdown!"
                    sx={{width:'100%'}}
                    defaultValue={type==='edit'?currentPost.content:null}
                />
                <div className="modal--buttons">
                    <button type='button' className='modal--cancel modal--btn' onClick={handleCancel}>Cancel</button>
                    <button type='button' className='modal--action modal--btn' onClick={handleConfirm}>Confirm</button>
                </div>
            </form>
        </div>
    )
}
export {Modal}