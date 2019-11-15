import * as React from 'react'
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

export const Admin: React.FunctionComponent = props => {

  const [cookies] = useCookies(['ny-key']);
  if (cookies['ny-key']) {
    return (
      <div id="Admin">
        <Navbar />
        <div className="container">
          <div className="columns">
            <div className="column is-3 ">
              <Sidebar />
            </div>
            <div className="column is-9">
            <div className="test-class" {...props} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <Redirect to="/" />
}

export default Admin