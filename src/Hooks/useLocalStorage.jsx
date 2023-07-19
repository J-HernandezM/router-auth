import { useEffect, useState } from "react"

function useLocalStorage ({defaultData, key}) {
    const [isEmpty, setEmpty] = useState()
    const [blogData, setBlogData] = useState([])
    const [usersLogged, setUsersLogged] = useState([])
    useEffect(()=>{
        const storage = localStorage.getItem(key)
        if(!storage){
            localStorage.setItem(key, JSON.stringify(defaultData))
            if(key==='PUBLISHED_POST'){setBlogData(defaultData)}
            else if(key==='LOGGED_USERS'){setUsersLogged(defaultData)}
        }else{
            if(key==='PUBLISHED_POST'){setBlogData(JSON.parse(storage))}
            else if(key==='LOGGED_USERS'){setUsersLogged(JSON.parse(storage))}
            
        }
    },[])

    useEffect(()=>{
        if(blogData.length===0){
            setEmpty(true)
        }else{
            setEmpty(false)
        }
    }, [blogData])

    const saveBlogData = (newBlogData) => {
        localStorage.setItem('PUBLISHED_POST', JSON.stringify(newBlogData))
        setBlogData(newBlogData)
    }
    const saveUsersLogged = (newUserLogged) => {
        localStorage.setItem('LOGGED_USERS', JSON.stringify(newUserLogged))
        setUsersLogged(newUserLogged)
    }
    
    return ({
        blogData,
        isEmpty,
        usersLogged,
        saveBlogData,
        saveUsersLogged
    })
}

export { useLocalStorage }