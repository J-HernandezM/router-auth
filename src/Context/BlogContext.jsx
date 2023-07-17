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
    }
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
    const editData = (newEntry, editId) => {
        const newArray = [...blogData]
        const index = newArray.findIndex((post)=>post.id==editId)
        newArray.splice(index, 1, newEntry)
        setBlogData(newArray)
    }
    return(
        <BlogContext.Provider value={{blogData, pushData, deleteData, editData}}>
            {children}
        </BlogContext.Provider>
    )
}


export {BlogContextProvider, BlogContext}