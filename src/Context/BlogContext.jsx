import { createContext, useState } from "react"

const BlogContext = createContext()
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
    },
    {
        id:5,
        title: 'Que es La vida',
        slug: 'que-es-la-vid',
        content: 'La vida es una chimba',
        author: 'juan'
    },
    {
        id:6,
        title: 'Que es La vida',
        slug: 'que-es-la-via',
        content: 'La vida es una chimba',
        author: 'juan'
    },
    {
        id:7,
        title: 'Que es La vida',
        slug: 'que-es-la-vda',
        content: 'La vida es una chimba',
        author: 'juan'
    },
    {
        id:8,
        title: 'Que es La vida',
        slug: 'que-es-la-ida',
        content: 'La vida es una chimba',
        author: 'juan'
    },
]

const BlogContextProvider = ({children}) => {
    const [blogData, setBlogData] = useState([...defaultData])
    const pushData = (newEntry) => {
        const newArray = [...blogData]
        newArray.push(newEntry)
        setBlogData(newArray)
    }
    const deleteData = (id) => {
        const checkArray = [...blogData]
        const filtered = checkArray.filter((post)=>post.id!=id)
        setBlogData(filtered)
    }
    return(
        <BlogContext.Provider value={{blogData, pushData, deleteData}}>
            {children}
        </BlogContext.Provider>
    )
}


export {BlogContextProvider, BlogContext}