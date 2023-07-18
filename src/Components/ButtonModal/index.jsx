import { Modal } from '../Modal'
import { useContext, useState } from "react"
import {BlogContext} from '../../Context/BlogContext'
import { useNavigate, useParams } from 'react-router-dom'

function ButtonModal({children, type, styles}){
    const [modalOn, setModalOn] = useState(false)
    const navigate = useNavigate()
    const {deleteData, blogData} = useContext(BlogContext)
    const {slug} = useParams()
    const currentPost = blogData.find(post=> post.slug===slug)

    const openModal = () => {setModalOn(true)}
    const handleClick = () => {
        if(type==='add'|| type==='edit'){
            openModal()
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
            {modalOn && <Modal type={type} setModalOn={setModalOn}/>}
        </>
    )
}

export{ButtonModal}