import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css'
import { useAuth } from '../../auth';

function Menu(props) {

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

const routes = [{
    id:1,
    to:'/',
    text:'homepage',
    private: false
},
{
    id:2,
    to:'/blog',
    text:'blog',
    private: false
},
{
    id:3,
    to:'/profile',
    text:'profile',
    private: true
},
{
    id:4,
    to:'/login',
    text:'login',
    private: false
},
{
    id:5,
    to:'/logout',
    text:'logout',
    private: true
}]


export { Menu };
