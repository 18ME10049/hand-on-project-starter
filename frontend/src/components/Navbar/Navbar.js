import React from "react";
import logo from "./logo.svg"
import { Link } from 'react-router-dom';
import { AuthContext } from "../../helper/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import style from "./Navbar.module.scss";

function Navbar() {

  const { authState, setAuthState } = useContext(AuthContext);
  let history = useNavigate();

  function handlelogout() {
    sessionStorage.removeItem("accessToken");
    setAuthState(false);
    swal.fire({
      icon: 'success',
      title: 'Logged out',
      showConfirmButton: false,
      timer: 1000,
    });
    history("/")
  }


  return (
    <nav className="navbar bg-light">
      <div className="container">
        <ul className="navbar-nav">
          <li className="">
            <Link to="/">
              <img alt="" src={logo} />
            </Link>
          </li>
        </ul>
        {authState ? (
          <>
            <table className={style.marg}>
              <tr><td><Link to="/my-apis">
                <button
                  type="button"
                  className={[style.custom_button, "btn"].join(' ')}
                >
                  My APIs
                </button>
              </Link></td>
                <td className="mr-100">
                  <Link to="/new-api">
                    <button
                      type="button"
                      className={[style.custom_button, "btn"].join(' ')}
                    >
                      +New API
                    </button>
                  </Link>
                </td>

                <td><button
                  type="button"
                  className={[style.custom_button, "btn"].join(' ')}
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
              <button type="button" className={[style.custom_button, "btn"].join(' ')}>
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