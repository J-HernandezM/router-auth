import { createContext, useState } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"

const BlogContext = createContext()

const BlogContextProvider = ({children}) => {
    const {blogData, setBlogData, isEmpty} = useLocalStorage()
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
        <BlogContext.Provider value={{blogData, isEmpty, pushData, deleteData, editData}}>
            {children}
        </BlogContext.Provider>
    )
}


export {BlogContextProvider, BlogContext}