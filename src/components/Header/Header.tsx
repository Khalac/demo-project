import { HEADERNAVIGATE } from "./constants/HeaderNav";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";
import { AuthContext } from "@/features/context/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="header__welcome">Welcome, {currentUser.email}!</div>
      {HEADERNAVIGATE.map((e) => {
        return (
          <NavLink
            to={e.path}
            key={e.id}
            className={({ isActive }) =>
              isActive ? "header__nav header__nav--active" : "header__nav"
            }
          >
            {e.name}
          </NavLink>
        );
      })}
      <button className="header__logout" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
};

export default Header;
