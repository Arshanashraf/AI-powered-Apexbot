import authService from "../../services/appwrite/auth"
import { useDispatch} from "react-redux"
import { logout } from "../../store/authSlice"
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <div >
      <button className="inline-block px-6 py-4  duration-200 text-xl text-white font-bold hover:bg-blue-100 rounded-full" onClick={logoutHandler}>logout</button>
    </div>
  )
}

export default LogoutBtn
