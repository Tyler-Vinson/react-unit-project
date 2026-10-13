
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import doorClosed from "../../assets/doorclosed.png";

const Navbar = () => {
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