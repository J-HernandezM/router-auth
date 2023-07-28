import React from 'react';
import './Login.css'
import { useAuth } from '../../auth.jsx';
import { authorizations } from '../../Server';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { useLocation } from 'react-router-dom';

function Login(props) {
    const [userData, setUser] = React.useState()
    const auth = useAuth()
    const {usersLogged, saveUsersLogged} = useLocalStorage({defaultData: [], key: 'LOGGED_USERS'})
    const location = useLocation()
    console.log(location);
    let from = location.state?.pathname || '/profile'

    
    const handleLoginBtn = (event) => {
        let roleD
        let usernameD = event.target.form[0].value
        authorizations.some((roleArray)=>{
            const currentUser = roleArray.find(backendUser=>
                backendUser.username===usernameD)
            roleD = currentUser?.role
            if(currentUser){return(true)}
        })
        setUser({...userData, username: usernameD, role: roleD})
        saveUsersLogged([...usersLogged, {username: usernameD, role: roleD}])
    }

    function login(event){
        event.preventDefault()
        auth.login(userData, from);
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