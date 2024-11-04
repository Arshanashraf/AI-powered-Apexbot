import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  const authStatus = useSelector((state: { auth: { status: string | null } }) => state.auth.status);
  const navigate = useNavigate();

  const navitems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <header className=" fixed w-full shadow bg--50 z-40">
      <Container>
        <Navbar expand="sm" className="flex items-center">
          <div className="mr-4 w-fit">
            <Link to="/" className="flex">
              <Logo />
              <div className="pl-2 pt-3 text-2xl font-extrabold text-purple-800">APEXBOT</div>
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" className="navbar-dark" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ml-auto flex ">
              {navitems.map(
                (item) =>
                  item.active && (
                    <Nav.Item key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-block px-6 py-4 duration-200 text-xl text-white font-bold hover:blur-sm hover:shadow-blue-500 hover:shadow-2xl rounded-full"
                      >
                        {item.name}
                      </button>
                    </Nav.Item>
                  )
              )}
              {authStatus && (
                <Nav.Item>
                  <LogoutBtn />
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
