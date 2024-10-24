
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { useDispatch } from 'react-redux'
import authService from './services/appwrite/auth'
import { login,logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=> setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          Todo: <Outlet />
        </main>
      </div>
    </div>
  ): null
}

export default App
