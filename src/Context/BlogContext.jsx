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
    const addComment = (post, newComment) => {
        const newArray = [...blogData]
        const postIndex = newArray.findIndex((backendPost)=>backendPost.id==post.id)
        post.comments.push(newComment)
        newArray.splice(postIndex, 1, post)
        saveBlogData(newArray)
    }
    const editComment = (post, newComment, oldCommentId) => {
        const newArray = [...blogData]
        const postIndex = newArray.findIndex((backendPost)=>backendPost.id==post.id)
        const commentIndex = post.comments.findIndex((comment)=>comment.id==oldCommentId)
        post.comments.splice(commentIndex, 1, newComment)
        newArray.splice(postIndex, 1, post)
        saveBlogData(newArray)
    }
    const deleteComment = (post, oldCommentId) => {
        const newArray = [...blogData]
        const postIndex = newArray.findIndex((backendPost)=>backendPost.id==post.id)
        const filteredComments = post.comments.filter((comment)=>comment.id!=oldCommentId)
        post.comments=filteredComments
        newArray.splice(postIndex, 1, post)
        saveBlogData(newArray)
    }
    return(
        <BlogContext.Provider value={{blogData, isEmpty, pushData, deleteData, editData, addComment, editComment, deleteComment}}>
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
        author: 'mari',
        comments: [{
            id: 1,
            author: 'juan',
            content: 'Qui tempor labore anim Lorem officia aliqua sunt. Anim dolor ea dolor veniam dolore duis adipisicing sint officia sunt ullamco sit culpa occaecat. Irure dolore ex ipsum officia non sint commodo ullamco mollit tempor minim fugiat adipisicing sunt. Duis non anim veniam excepteur est ut enim duis occaecat deserunt excepteur magna.',
            likes: 1,
            date: '01/01/23',
        },
        {
            id: 5,
            author: 'pedro',
            content: 'Que dices loca',
            likes: 1,
            date: '01/01/23',
        }]
    },
    {
        id:2,
        title: 'Que es Vite',
        slug: 'que-es-vite',
        content: 'Vite es una chimba',
        author: 'juanchocarrancho',
        comments: [{
            id: 2,
            author: 'mari',
            content: 'Que nota de Post',
            likes: 2,
            date: '01/01/23',
        }]
    },
    {
        id:3,
        title: 'Que es JavaScript',
        slug: 'que-es-javascript',
        content: 'JavaScript es una chimba',
        author: 'wilson',
        comments: [{
            id: 3,
            author: 'hater1',
            content: 'Este post es basura',
            likes: 3,
            date: '01/01/23',
        }]
    },
    {
        id:4,
        title: 'Que es La vida',
        slug: 'que-es-la-vida',
        content: 'La vida es una chimba',
        author: 'juan',
        comments: [{
            id: 4,
            author: 'hater2',
            content: 'La vida es una mierda',
            likes: 3,
            date: '01/01/23',
        }]
    }
]


export {BlogContextProvider, BlogContext}