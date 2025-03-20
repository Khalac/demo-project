import { HEADERNAVIGATE } from "@/constants/HeaderNav";
import { NavLink } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      {HEADERNAVIGATE.map((e) => {
        return (
          <NavLink
            to={e.path}
            key={e.id}
            className={({ isActive }) =>
              isActive ? "header_nav active" : "header_nav"
            }
          >
            {e.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Header;
