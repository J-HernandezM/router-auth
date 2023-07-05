import React from 'react';
import './Login.css'
import { useAuth } from '../../auth.jsx';

function Login(props) {
    const [userData, setUser] = React.useState()
    const auth = useAuth()

    function login(event){
        event.preventDefault()
        auth.login(userData);
    }
    return (
        <>
            <h1>Login</h1>
            <form className='form--login' onSubmit={login}>
                <label htmlFor="name">Username</label>
                <input type="name" name='name' className='loginInput' id='name'/>
                <button className='form--btn' type='submit' onClick={
                    event=>setUser({...userData, username: event.target.form[0].value})
                    }> Login </button>
            </form>
        </>
    );
}

export { Login };