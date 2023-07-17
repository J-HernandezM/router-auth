import React from 'react';
import { useAuth } from '../../auth';

function Logout(props) {
    const auth = useAuth()
    function logout(event){
        event.preventDefault()
        auth.logout()
    }

    return (
        <>
            <h1>Logout</h1>
            <form  className='form--logout' onSubmit={logout}>
                <label htmlFor="name">Sure you want to Log out?</label>
                <button className='form--btn logout' type='submit'> Log out </button>
            </form>
        </>
    );
}

export { Logout };