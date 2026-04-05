import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginStatus } from "../../redux/slices/UserSlice";
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(loginStatus(false));
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/login");
    }, 0);
  }
  const { isLogin } = useSelector((state) => state.user);
  // console.log(isLogin);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Expense Manager
        </Link>

        <div className="collapse navbar-collapse" id="mobile-nav">
          {/* <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul> */}
          {isLogin ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link" onClick={handleLogout} role="button">
                  Logout
                </span>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
