import {Container,Logo,LogoutBtn} from "../index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
function Header() {
  const authStatus = useSelector((state: {auth: {status: string | null}}) => state.auth.status);
  const navigate = useNavigate()
  const navitems = [
    {
      name: "Home",
      slug: '/home',
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus
    }
  ]
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to={"/"}><Logo  width="100%"/></Link>
          </div>
          <ul className="flex ml-auto">
            {navitems.map((item) => item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} 
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">{item.name}</button>
              </li>
            ): null)}{
              authStatus && (
                <li><LogoutBtn /></li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
