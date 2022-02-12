import React from "react";
import logo from "./logo.svg"
import { Link } from 'react-router-dom';
import { AuthContext } from "../../helper/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {


  const { authState, setAuthState } = useContext(AuthContext);
  let history = useNavigate();
  function handlelogout() {
    sessionStorage.removeItem("accessToken");
    setAuthState(false);
    history("/")
  }


  return (
    <nav className="navbar navbar-expand-em bg-light">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/">
              <img alt="" src={logo} />
            </Link>
          </li>
        </ul>
        {authState ? (
          <>
            <table>
              <tr><td><Link to="/my-apis">
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  My APIs
                </button>
              </Link></td>
                <td className="ml-30">
                  <Link to="/new-api">
                    <button
                      type="button"
                      className="btn btn-primary"
                    >
                      +New API
                    </button>
                  </Link>
                </td>

                <td><button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlelogout}
                >
                  Logout
                </button>
                </td>
              </tr>
            </table>
          </>
        ) : (
          <>
            <Link to="/LoginPage">
              <button type="button" className="btn btn-primary">
                Login/Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;