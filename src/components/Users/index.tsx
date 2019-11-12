import React, { useState, useEffect } from 'react'
import useFetch from 'fetch-suspense';
import { UserInterface } from './types'

const Users : React.FC = (props) => {
  const [response] = useState(
    useFetch('https://reqres.in/api/users?page=1', { method: 'GET' }, { metadata: true })
  )
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if(response.ok) {
      const { data } = response.response as any
      setUsers(data)
    } else {
      setError(response.statusText)
    }
  }, [response])

  return(
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Users
          </p>
        </header>
        <div className="card-table">
          <div className="content">
            <table className="table is-fullwidth is-striped is-hoverable">
              <tbody>
                {
                  !error && users && users.map((user:UserInterface, key: any) => {
                    return (
                <tr key={key}>
                  <td style={{width: '15%'}}>
                    <figure className="image is-32x32">
                      <img className="is-rounded" src={user.avatar} />
                    </figure>
                  </td>
                  <td>
                    <div>
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                  </td>
                  <td>
                    <div >
                      <p>{user.email}</p>
                    </div>
                  </td>
                </tr>
                    )
                  })
                }
              </tbody>
            </table>
            {
              error && <p style={{padding: 10, paddingTop: 0}}>{error}</p>
            }
          </div>
        </div>
      </div>
  )
}

export default Users