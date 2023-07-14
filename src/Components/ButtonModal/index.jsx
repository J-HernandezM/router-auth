import { Modal } from '../Modal'
import { useState } from "react"

function ButtonModal({children, type}){
    const [modalOn, setModalOn] = useState(false)
    function openModal(){
        setModalOn(true)
    }
    
    return(
        <>
            <button onClick={openModal}>
                {children}
            </button>
            {(modalOn && (type==='add'|| type==='edit')) && <Modal type={type} setModalOn={setModalOn}/>}
        </>
    )
}

export{ButtonModal}