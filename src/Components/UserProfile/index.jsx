import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { Paper } from '@mui/material';
import './UserProfile.css'

function UserProfile() {
    const {slug} = useParams()
    const {usersLogged} = useLocalStorage({key: 'LOGGED_USERS'})
    const usersLoggedA = [...usersLogged]
    const currentUser = usersLoggedA.find(user=>user.slug===slug)
    return (
        <Paper className={`userProfiles ${!currentUser?'userProfiles--nothing':''}`}>
            {!currentUser && <p className='emptyText'>Woops! Nothing here</p>}
            {currentUser && 
                <p>
                    ESTOY AQ, mi nombre es {currentUser.username}
                </p>
            }
        </Paper>
    );
}

export default UserProfile;