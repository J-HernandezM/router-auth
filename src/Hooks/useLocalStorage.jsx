import { useEffect, useState } from "react"

const defaultData = [
    {
        id:1,
        title: 'Que es React',
        slug: 'que-es-react',
        content: 'react es una chimba',
        author: 'mari'
    },
    {
        id:2,
        title: 'Que es Vite',
        slug: 'que-es-vite',
        content: 'Vite es una chimba',
        author: 'juanchocarrancho'
    },
    {
        id:3,
        title: 'Que es JavaScript',
        slug: 'que-es-javascript',
        content: 'JavaScript es una chimba',
        author: 'wilson'
    },
    {
        id:4,
        title: 'Que es La vida',
        slug: 'que-es-la-vida',
        content: 'La vida es una chimba',
        author: 'juan'
    }
]

function useLocalStorage () {
    const [isEmpty, setEmpty] = useState()
    const [blogData, setBlogData] = useState([...defaultData])

    useEffect(()=>{
        if(blogData.length===0){
            const storage = localStorage.getItem('PUBLISHED_POST')
            storage?localStorage.removeItem('PUBLISHED_POST'):undefined
            setEmpty(true)
        }else{
            setEmpty(false)
            localStorage.setItem('PUBLISHED_POST', JSON.stringify(blogData))
        }
    },[blogData])
    
    return ({
        blogData,
        isEmpty,
        setBlogData,
    })
}

export { useLocalStorage }