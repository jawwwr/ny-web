import React from 'react'
import { UserInterface, UsersIProps } from './types'

const Users : React.FC<UsersIProps> = (props :UsersIProps) => {
  const { users, error } : any = props
  return(
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Users
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            {
              !users || users.length === 0 ?
                'Loading ...' : ''
            }
            <table className="table is-fullwidth is-striped is-hoverable">
              <tbody>
                {
                  !error && users && users.map((user:UserInterface, key: any) => {
                    return (
                <tr key={key}>
                  <td style={{width: '15%'}}>
                    <figure className="image is-32x32">
                      <img className="is-rounded" src={user.avatar} alt={`${user.first_name} ${user.last_name}`}/>
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