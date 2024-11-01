import {Container,Logo,LogoutBtn} from "../index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
function Header() {
  const authStatus = useSelector((state: {auth: {status: string | null}}) => state.auth.status);
  const navigate = useNavigate()
  const navitems = [
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
    <header className="py-3 fixed w-full shadow bg--50">
      <Container>
        <nav className="flex">
          <div className="mr-4 w-fit  ">
            <Link to={"/"} className="flex"><Logo /> <div className="pl-2 pt-4 text-2xl font-extrabold text-purple-800">APEXBOT</div> </Link>
          </div>
          <ul className="flex ml-auto">
            {navitems.map((item) => item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} 
                  className="inline-block px-6 py-4 duration-200 text-xl text-white font-bold hover:blur-sm hover:shadow-blue-500 hover:shadow-2xl rounded-full">{item.name}</button>
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
