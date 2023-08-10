import { TextField } from '@mui/material'
import './Modal.css'
import { useContext, useRef } from 'react'
import { BlogContext } from '../../Context/BlogContext'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../../auth'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ModalContext } from '../../Context/ModalContext'
import { useLocalStorage } from '../../Hooks/useLocalStorage'

function Modal({type, isProfile, userData, setUser}){
    const { setModalOn }= useContext(ModalContext)
    const auth = useAuth()
    const navigate = useNavigate()
    const {pushData, blogData, editData} = useContext(BlogContext)
    const {slug} = useParams()
    const currentPost = blogData.find(post=> post.slug===slug)
    const location = useLocation()
    const form = useRef(null)
    const {usersLogged, saveUsersLogged} = useLocalStorage({key: 'LOGGED_USERS'})


    const handleConfirm = (event) => {
        const title = event.target.form[0].value
        if(!title){
            alert('Please use a title')
        }else{
            const content = event.target.form[2].value
            const id = uuidv4().slice(0, 4)
            const slug = `${title.toLowerCase().replaceAll(' ', '-')}:${id}`
            const newPost = {
                id: id,
                title: title,
                slug: slug,
                content: content,
                author: auth.user?.username,
                comments:[],
            }
            setModalOn(false)
            if(type==='add'){
                pushData(newPost)
            }else if (type==='edit'){
                editData(newPost, currentPost.id)
                navigate(`/blog/${slug}`)
            }
        }
        
    }

    // name, profilePic, phone, description

    const handleCancel = () => {setModalOn(false)}
    const handleNotLogged = () => {
        setModalOn(false)
        navigate('/login', {state: location}
    )}

    const handleImagePreview = (event) => {
        const file = event.target.files[0]
        const url = URL.createObjectURL(file)
        const preview = event.target.nextSibling
        preview.src = url
        preview.classList.remove('preview')
        preview.classList.add('previewed')
    }
    const handleProfileConfirm = (event) => {
        event.preventDefault()
        if(isProfile){
            const formData = new FormData(form.current)
            const additionalData = {
                name: formData.get('name'),
                profilePic: URL.createObjectURL(formData.get('file')), //event.target.form[2].value
                phone: formData.get('phone'),
                description: formData.get('description')
            }
            const alreadySaved = usersLogged.some((user) => user.username==auth.user?.username)
            if(alreadySaved){
                const newLocalStorage = [...usersLogged]
                let index
                newLocalStorage.forEach((entry, i)=>{
                    if(entry.username==auth.user?.username){
                        index = i
                    }
                })
                newLocalStorage.splice(index, 1, {...userData, ...additionalData})
                saveUsersLogged([...newLocalStorage])
            }else{
                saveUsersLogged([...usersLogged, {...userData, ...additionalData}])
            }
            setUser({...userData, ...additionalData})
            setModalOn(false)
        }
    }

    return(
        <div className="modal--bg">
            
            <form className="modal--container" ref={form} onSubmit={handleProfileConfirm}>
                {!auth.user && 
                    <>
                        <h2 className='modal--title'>You need to be logged</h2>
                        <button type='button' className='modal--btn' onClick={handleNotLogged}>Login</button>
                    </>
                }
                {(auth.user && !isProfile) &&
                    <>
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
                    </>
                }
                {(auth.user && isProfile) && 
                    <>
                        <h2 className='modal--title'>Edit your profile</h2>
                        <div className='modal--namepic'>
                            <TextField
                                sx={{width:'75%'}}
                                label="Name"
                                variant="outlined"
                                defaultValue={type==='edit'?userData?.name:null}
                                name='name'
                            />
                            <label className='modal--file'>
                                <input type="file" name='file' className='modal--file-input' accept="image/*" onChange={handleImagePreview}/>
                                <img className='preview' src="/user.png" alt="user image"/>
                            </label>
                        </div>
                        <TextField 
                            sx={{width:'100%'}} 
                            label="Phone number" 
                            variant="outlined" 
                            name='phone'
                            defaultValue={type==='edit'?userData?.phone:null}
                        />
                        <TextField
                            label="Description"
                            multiline
                            maxRows={13}
                            name='description'
                            placeholder="You can use Markdown!"
                            sx={{width:'100%'}}
                            defaultValue={type==='edit'?userData?.description:null}
                        />
                        <div className="modal--buttons">
                            <button type='button' className='modal--cancel modal--btn' onClick={handleCancel}>Cancel</button>
                            <button type='submit' className='modal--action modal--btn' onClick={handleProfileConfirm}>Confirm</button>
                        </div>
                    </>
                }
                
            </form>
        </div>
    )
}
export {Modal}