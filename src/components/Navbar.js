import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// styles
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <div className={styles.title}>
          <Link to="/">myMoney</Link>
        </div>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <span>{user.displayName}</span>
            <button className="btn" onClick={handleClick}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
