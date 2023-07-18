import React from 'react';
import './Login.css'
import { useAuth } from '../../auth.jsx';
import { authorizations } from '../../Server';

function Login(props) {
    const [userData, setUser] = React.useState()
    const auth = useAuth()
    let roleD
    authorizations.some((roleArray)=>{
        const currentUser = roleArray.find(backendUser=>
            backendUser.username===userData?.username)
        roleD = currentUser?.role
        if(currentUser){return(true)}
    })
    console.log(roleD)

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
                    event=>{
                        setUser({...userData, username: event.target.form[0].value, role: roleD})
                    }
                }> Login </button>
            </form>
        </>
    );
}

export { Login };