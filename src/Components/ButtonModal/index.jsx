import { Modal } from '../Modal'
import { useContext, useState } from "react"
import {BlogContext} from '../../Context/BlogContext'

function ButtonModal({children, type}){
    const [modalOn, setModalOn] = useState(false)
    const {blogData, deleteData} = useContext(BlogContext) 
    
    const openModal = () => {setModalOn(true)}
    const handleClick = (event) => {
        let parent = event.target.parentElement
        while(parent.nodeName!='DIV'){
            parent = parent.parentElement
        }
        if(type==='add'|| type==='edit'){
            openModal()
        }else if(type==='delete'){
            deleteData(parent.id)
            console.log(parent.id);
        }
    }

    console.log('button', blogData);
    return(
        <>
            <button onClick={handleClick}>
                {children}
            </button>
            {modalOn && <Modal type={type} setModalOn={setModalOn}/>}
        </>
    )
}

export{ButtonModal}