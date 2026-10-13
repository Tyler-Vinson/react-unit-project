import { NavLink as RouterNavLink } from "react-router-dom";

export function Nav({ children }) {
    return <nav>{children}</nav>;
}

export function NavMenu({ children }) {
    return <div className="nav-menu">{children}</div>;
}

export const NavLink = RouterNavLink;
