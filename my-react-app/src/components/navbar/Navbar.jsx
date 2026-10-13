
import { useLocation } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import doorClosed from "../../assets/doorclosed.png";

const Navbar = () => {
    const { pathname } = useLocation();
    if (pathname === "/" || pathname === "/main-room") return null;

    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/">
                        <img src={doorClosed} alt="Home" style={{ height: "40px" }} />
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;