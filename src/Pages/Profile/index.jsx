import React from 'react';
import { useAuth } from '../../auth';
import { Outlet } from 'react-router-dom';

function Profile(props) {
    const auth = useAuth()
    return (
        <>
            <h1>Profile</h1>
            <p>Welcome, {auth.user.username}</p>
            <br/>
            <Outlet />
        </>
    );
}

export { Profile };