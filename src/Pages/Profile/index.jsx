import React from 'react';
import { useAuth } from '../../auth';

function Profile(props) {
    const auth = useAuth()
    return (
        <>
            <h1>Profile</h1>
            <p>Welcome, {auth?.user?.username?auth.user.username:'no-name-yet'}</p>
        </>
    );
}

export { Profile };