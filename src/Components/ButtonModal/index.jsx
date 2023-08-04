import { Modal } from '../Modal'
import { useContext } from "react"
import {BlogContext} from '../../Context/BlogContext'
import { useNavigate, useParams } from 'react-router-dom'
import { ModalContext } from '../../Context/ModalContext'

function ButtonModal({children, type, styles}){
    const {deleteData, blogData} = useContext(BlogContext)
    const {modalOn, setModalOn}= useContext(ModalContext)
    const {slug} = useParams()
    const navigate = useNavigate()
    
    const currentPost = blogData.find(post=> post.slug===slug)

    const handleClick = () => {
        if(type==='add'|| type==='edit'){
            setModalOn(true)
        }else if(type==='delete'){
            deleteData(currentPost.id)
            navigate('/blog')
        }
    }

    return(
        <>
            <button className={styles?styles:''} onClick={handleClick}>
                {children}
            </button>
            {modalOn && <Modal type={type}/>}
        </>
    )
}

export{ButtonModal}