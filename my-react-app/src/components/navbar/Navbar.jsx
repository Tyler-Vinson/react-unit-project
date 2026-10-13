
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/main-room">
                        Main Room
                    </NavLink>
                    <NavLink to="/old-photos">
                        Historic Art
                    </NavLink>
                    <NavLink to="/3d">
                        Statue Renders
                    </NavLink>
                    <NavLink to="/modern">
                        Modern Art
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;