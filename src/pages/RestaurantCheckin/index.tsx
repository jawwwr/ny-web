import React, { useState, useEffect } from 'react'
import API from 'services/api'
import SOCKETIO from 'services/socketio'
import RestaurantCard from 'components/RestaurantCard'
import Modal from 'components/Modal'

const RestaurantCheckin: React.FC = ({match}:any) => {
  const [restaurant, setRestaurant] = useState();
  const [active_modal, setActiveModal] = useState(false)
  const [error, setError] = useState();

  useEffect( () => {
    SOCKETIO.on('connect', () => {
      console.log("Connected to socketio - web app.", SOCKETIO.id)
    })

    console.log()

    if(match.params.id) {
      const getRestaurant = async () => {
        try {
          const response = await API('GET', `restaurants/${match.params.id}`)
          console.log(response)
          setRestaurant(response.data)
        } catch (api_error) {
          setError(api_error)
        }
    }
    getRestaurant()
  }
  }, [])

  return(
    <div id="RestaurantCheckin">
      <div className="container">
        <div className="card large round">
          {
            !restaurant ? 
            <>
              <div className="card-content">
                Loading...
              </div>
            </>
            :
            <>
            <div className="card-content">
              <div className="tabs">
                <ul>
                  <li className="is-active"><a>Friends</a></li>
                  <li><a>Group</a></li>
                  <li><a>Activity</a></li>
                </ul>
              </div>
              <div className="">
                Expenses with friends goes here...
              </div>
            </div>
            </>
          }
      </div>
      </div>
      <Modal active_modal={active_modal} setActiveModal={setActiveModal}/>
    </div>
  )
}

export default RestaurantCheckin