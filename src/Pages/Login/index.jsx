import React from 'react';
import './Login.css'
import { useAuth } from '../../auth.jsx';
import { authorizations } from '../../Server';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { useLocation } from 'react-router-dom';

function Login(props) {
    const auth = useAuth()
    const {usersLogged, saveUsersLogged} = useLocalStorage({defaultData: [], key: 'LOGGED_USERS'})
    const location = useLocation()
    
    
    const handleLoginBtn = (event) => {
        let role
        let username = event.target.form[0].value
        const slug = `${username.toLowerCase().replaceAll(' ', '-')}`
        authorizations.some((roleArray)=>{
            const currentUser = roleArray.find(backendUser=>
                backendUser.username===username)
            role = currentUser?.role
            if(currentUser){return(true)}
        })
        props.setUser({...props.userData, username, role, slug})
        saveUsersLogged([...usersLogged, {username, role, slug}])
    }

    function login(event){
        event.preventDefault()
        let username = event.target[0].value
        const slug = `${username.toLowerCase().replaceAll(' ', '-')}`
        let from = location.state?.pathname || `/profile/${slug}`
        auth.login(props.userData, from);
    }
    return (
        <>
            <h1>Login</h1>
            <form className='form--login' onSubmit={login}>
                <label htmlFor="name">Username</label>
                <input type="name" name='name' className='loginInput' id='name'/>
                <button className='form--btn' type='submit' onClick={handleLoginBtn}> Login </button>
            </form>
        </>
    );
}

export { Login };