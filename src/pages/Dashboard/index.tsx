import React, { useEffect, useState, Suspense, lazy } from 'react'
import API from 'api'
import Admin from 'pages/Admin';

const LazayUser = lazy(() => import('components/Users'));

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  useEffect( () => {
    const getUsers = async () => {
      try {
        const response = await API('GET', "users?page=1")
        setUsers(response.data.data)
      } catch (api_error) {
        setError(api_error)
      }
  }
  getUsers()
  }, [])

  return(
    <Admin>
      <div id="Dashboard">
        <div className="title is-4" >Dashboard</div>
        <Suspense fallback="Loading...">
          <LazayUser users={users} error={error} />
        </Suspense>
      </div>
    </Admin>
  )
}

export default Dashboard