import { HeaderNav } from '@/constants/HeaderNav'
import { NavLink } from 'react-router-dom'
import './Header.scss'
const Header = () => {
  return (
    <div className="header">
      {HeaderNav.map((nav) => {
        return (
          <NavLink
            to={nav.path}
            key={nav.id}
            className={({ isActive }) =>
              isActive ? 'headernav active' : 'headernav'
            }
          >
            {nav.name}
          </NavLink>
        )
      })}
    </div>
  )
}

export default Header
