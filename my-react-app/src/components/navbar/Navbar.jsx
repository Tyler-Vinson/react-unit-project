
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/main-room" activeStyle>
                        Main Room
                    </NavLink>
                    <NavLink to="/old-photos" activeStyle>
                        Historic Art
                    </NavLink>
                    <NavLink to="/3d" activeStyle>
                        Statue Renders
                    </NavLink>
                    <NavLink to="/modern" activeStyle>
                        Modern Art
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;