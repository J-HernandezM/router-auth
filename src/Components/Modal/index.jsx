import './Modal.css'
function Modal({type, setModalOn}){
    return(
        <div className="modal--bg">
            <div className="modal--container">
                <h2>{type}</h2>
                <button onClick={()=>{setModalOn(false)}}>{type}</button>
            </div>
        </div>
    )
}
export {Modal}