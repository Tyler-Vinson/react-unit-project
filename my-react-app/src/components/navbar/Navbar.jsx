
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/main-room" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/old-photos" activeStyle>
                        Contact Us
                    </NavLink>
                    <NavLink to="/3d" activeStyle>
                        Blogs
                    </NavLink>
                    <NavLink to="/modern" activeStyle>
                        Sign Up
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;