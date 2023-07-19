import { createContext, useState } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"

const BlogContext = createContext()

const BlogContextProvider = ({children}) => {
    const {blogData, saveBlogData, isEmpty} = useLocalStorage({defaultData, key: 'PUBLISHED_POST'})
    const pushData = (newEntry) => {
        const newArray = [...blogData]
        newArray.push(newEntry)
        saveBlogData(newArray)
    }
    const deleteData = (id) => {
        const checkArray = [...blogData]
        const filtered = checkArray.filter((post)=>post.id!=id)
        saveBlogData(filtered)
    }
    const editData = (newEntry, editId) => {
        const newArray = [...blogData]
        const index = newArray.findIndex((post)=>post.id==editId)
        newArray.splice(index, 1, newEntry)
        saveBlogData(newArray)
    }
    return(
        <BlogContext.Provider value={{blogData, isEmpty, pushData, deleteData, editData}}>
            {children}
        </BlogContext.Provider>
    )
}

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
        id: 5,
        title: 'Markdown',
        slug: 'markdown',
        content: `markdown`,
        author: 'markdown'
    }
]


export {BlogContextProvider, BlogContext}