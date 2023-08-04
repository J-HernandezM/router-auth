import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css'
import { useAuth } from '../../auth';

function Menu({userData}) {
    const routes = [{
        id:1,
        to:'/',
        text:'Home',
        private: false
    },
    {
        id:2,
        to:'/blog',
        text:'Blogs',
        private: false
    },
    {
        id:3,
        to:`/profile${userData?`/${userData?.slug}`:''}`,
        text:'Profil',
        private: true
    },
    {
        id:4,
        to:'/login',
        text:'Login',
        private: false
    },
    {
        id:5,
        to:'/logout',
        text:'Logout',
        private: true
    }]

    const auth = useAuth()
    return (
        <nav>
            <ul>
                {routes.map((route)=>{
                    //La ruta es privada y NO estamos autenticados
                    if(route.private && !auth.user){
                        return null
                    }else if (route.to==='/login' && auth.user){
                        return null
                    }
                    return(
                    <li key={route.id}>
                        <NavLink style={
                    ({isActive})=>({
                        color: isActive?'white':'gray'
                    })}
                 to={route.to} >{route.text}</NavLink>
                    </li>
                    )
                })}
            </ul>
        </nav>
    );
}




export { Menu };
