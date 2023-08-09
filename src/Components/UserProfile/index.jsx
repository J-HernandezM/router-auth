import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { Paper } from '@mui/material';
import './UserProfile.css'
import { Modal } from '../Modal';
import { useAuth } from '../../auth';
import { ModalContext } from '../../Context/ModalContext';
import EditIcon from '@mui/icons-material/Edit';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

function UserProfile({userData, setUser}) {
    const {slug} = useParams()
    const { setModalOn, modalOn }= useContext(ModalContext)

    //User exists in backend?
    const {usersLogged} = useLocalStorage({key: 'LOGGED_USERS'})
    console.log(usersLogged);
    const usersLoggedA = [...usersLogged]
    const currentUser = usersLoggedA.find(user=>user.slug===slug)
    console.log(currentUser);
    //User owns the current profile page
    const auth = useAuth()
    const ownProfile = currentUser?.username===auth.user?.username?true:false

    const handleClick = () => {
        setModalOn(true)
    }

    return (
        <Paper className={`userProfiles ${!currentUser?'userProfiles--nothing':''}`}>
            {!currentUser && <p className='emptyText'>Woops! Nothing here</p>}
            {currentUser && 
                <>
                    <figure className="profile--picBox">
                        <img className='profile--pic' src={userData.profilePic} alt="profile pic" />
                    </figure>
                    <div className="profile--naming">
                        <p className='profile--name' >{userData.name}</p>
                        <p className='profile--username' >@{userData.username}</p>
                    </div>
                    <p className='profile--phone' >{userData.phone}</p>
                    <ReactMarkdown className='profile--description' >{userData.description}</ReactMarkdown>
                </>
            }
            {ownProfile && <button className='profile--edit--button' onClick={handleClick}><EditIcon fontSize='small' /></button>}
            
            
            {modalOn && <Modal type='edit' isProfile={true} userData={userData} setUser={setUser} />}
        </Paper>
    );
}

export default UserProfile;