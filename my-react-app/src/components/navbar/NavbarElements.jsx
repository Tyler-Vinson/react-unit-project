import { NavLink as RouterNavLink } from 'react-router-dom'

export const Nav = ({ children }) => <nav>{children}</nav>

export const NavMenu = ({ children }) => <div>{children}</div>

export const NavLink = ({ activeStyle, ...props }) => {
  const resolvedActiveStyle =
    activeStyle && typeof activeStyle === 'object' ? activeStyle : undefined

  return (
    <RouterNavLink
      {...props}
      style={({ isActive }) =>
        isActive && resolvedActiveStyle ? resolvedActiveStyle : undefined
      }
    />
  )
}
