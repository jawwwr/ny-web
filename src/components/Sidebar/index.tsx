import * as React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FunctionComponent = props => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <Link to="dashboard" className="is-active">Dashboard</Link>
        </li>
        <li>
          <Link to="other-page">Other Page</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
