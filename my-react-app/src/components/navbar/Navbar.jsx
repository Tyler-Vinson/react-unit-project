
import { useLocation } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import doorClosed from "../../assets/doorclosed.png";

const Navbar = () => {
    const { pathname } = useLocation();
    if (pathname === "/" || pathname === "/main-room" || pathname === "/three-doors") return null;

    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/three-doors">
                        <img src={doorClosed} alt="Back to the three doors" style={{ height: "40px" }} />
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;