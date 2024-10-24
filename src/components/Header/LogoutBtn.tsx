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
    <div>
      <button onClick={logoutHandler}>logout</button>
    </div>
  )
}

export default LogoutBtn
