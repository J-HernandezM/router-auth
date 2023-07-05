import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { Blog } from './Pages/Blog'
import { Profile } from './Pages/Profile'
import { Post } from './Components/Post'
import { Menu } from './Components/Menu'
import { Login } from './Pages/Login'
import { Logout } from './Pages/Logout'
import { AuthProvider } from './auth.jsx'

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />

          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/blog' element={<Blog/>} >
              <Route path=':slug' element={<Post />} />
            </Route>

            <Route path='/login' element={<Login/>} />
            <Route path='/logout' element={<Logout/>} />
            <Route path='/profile' element={<Profile/>} />


            <Route path='*' element={<p>Not found</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
