import * as React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FunctionComponent = (props: any) => {
  return (
    <aside className="menu is-hidden-mobile">
      <p className="menu-label">TransferWise</p>
      <ul className="menu-list">
        <li>
          <Link to="/admin/balances" className="is-active">
            Balances
          </Link>
          <ul>
            <li>
              <Link to="#">Auto Payout Process</Link>
            </li>
            <li>
              <Link to="/admin/transfers" className="">
                Transfers
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/admin/schedule/list" className="">
            Schedules
          </Link>
          <ul>
            <li>
              <Link to="/admin/schedule/list">List</Link>
            </li>
            <li>
              <Link to="/admin/schedule/create">Create</Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
