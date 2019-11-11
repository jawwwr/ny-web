import * as React from "react";
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import './styles.scss'

const Navbar: React.FunctionComponent = props => {
  const [cookies, setCookie, removeCookie] = useCookies(['ny-key']);

  return (
    <nav id="Navbar" className="navbar is-white">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item brand-text" to="/">
            NY Web
          </Link>
          <div className="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            {
              cookies['ny-key'] ?
              <>
                <Link className="navbar-item" to="/admin/dashboard">
                  Dashboard
                </Link>
                <Link className="navbar-item" to="/admin/other-page">
                  Other Page
                </Link>
              </>
              :
              ''
            }
          </div>
          <div className="navbar-end">
            {
              cookies['ny-key'] ?
                <Link to="" className="navbar-item" onClick={() => removeCookie('ny-key', {path: '/'})}> Logout</Link>
              : <Link to="" className="navbar-item" onClick={() => setCookie('ny-key', 'test-key', {path: '/'})}> Login</Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
