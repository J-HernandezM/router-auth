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
import { AuthProvider, AuthRoute, NoAuthRoute, useAuth } from './auth.jsx'
import { AllPosts } from './Pages/AllPosts'
import { BlogContextProvider } from './Context/BlogContext'
import { ModalContextProvider } from './Context/ModalContext'
import UserProfile from './Components/UserProfile'

function App() {
  const [userData, setUser] = useState()
  console.clear() // Quitar esto
  return (
    <>
      <HashRouter>
        <BlogContextProvider>
          <AuthProvider>
            <ModalContextProvider>
              <Menu userData={userData}/>
              <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/blog' element={<Blog/>} >
                  <Route path=':slug' element={<Post />} />
                </Route>
                <Route path='blog/allPosts' element={<AllPosts />} />
                <Route path='/login'
                  element={
                    <NoAuthRoute>
                      <Login userData={userData} setUser={setUser}/>
                    </NoAuthRoute>
                  }
                />
                <Route path='/logout'
                  element={
                    <AuthRoute>
                      <Logout/>
                    </AuthRoute>
                  }
                />
                <Route path='/profile'
                  element={
                    <AuthRoute>
                      <Profile/>
                    </AuthRoute>
                  }
                >
                  <Route path=':slug' element={<UserProfile/>}/>
                </Route>


                <Route path='*' element={<p>Not found</p>} />
              </Routes>
            </ModalContextProvider>
          </AuthProvider>
        </BlogContextProvider>
      </HashRouter>
    </>
  )
}

export default App
