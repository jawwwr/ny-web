import * as React from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

export const Admin = (props: any) => {
  const { page } = props;
  const [cookies] = useCookies(["ny-key"]);
  if (cookies["ny-key"]) {
    return (
      <div id="Admin">
        <Navbar />
        <div className="container">
          <div className="columns">
            {page === "date-time-picker" ? (
              <></>
            ) : (
              <div className="column is-3 ">
                <Sidebar />
              </div>
            )}
            <div className="column">
              <div className="test-class" {...props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default Admin;
