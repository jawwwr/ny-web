import React from 'react'
import { useResource } from 'rest-hooks';
import UserResource from 'resources/user'

const Home: React.FC = () => {
  const users = useResource(UserResource.detailShape(), { page: 2 });
  console.log(users)
  return(
    <article>
      <div className="title is-3" >User Profile</div>
      {
        users.data.map((user, key) => {
          return(
            <div key={key}>
              <div className="title is-4">{`${user.first_name} ${user.last_name}`}</div>
            </div>
          )
        })
      }
    </article>
  )
}

export default Home