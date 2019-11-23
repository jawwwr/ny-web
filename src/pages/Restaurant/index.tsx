import React, { useState, useEffect } from 'react'
import API from 'services/api'
import SOCKETIO from 'services/socketio'
import RestaurantCard from 'components/RestaurantCard'

const PhotoView = ({ photo } :any) => {
  return(
    <div className="column is-one-third">
    <div className="card large round">
      <div className="card-image ">
        <figure className="image">
            <img src={photo.url} alt="Image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="">{photo.user.caption}</p>
            <p className="title is-6 no-padding">{photo.user.name}</p>
            <p className="subtitle is-7">Uploader</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

const Restaurant: React.FC = ({match}:any) => {
  const [restaurant, setRestaurant] = useState();
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
    <div id="Restaurant">
      <div className="container">
        <div className="columns">
            {
              !restaurant ? 
              <>
                <div className="column is-one-third">
                  <div className="card large round">
                  <div className="card-content">
                    Loading...
                  </div>
                  </div>
                </div>
              </>
              : <RestaurantCard restaurant={restaurant} src="view"/>
            }
          <div className="column">
            <div className="card large round">
              <div className="card-content">
                  {
                    !restaurant ?
                    'Loading...' :
                    <>
                    <div className="columns">
                      <div className="column">
                        <div className="title is-4 has-text-primary">
                          {restaurant.establishment[0]}
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <div className="title is-4">
                        {`${restaurant.user_rating.rating_text}: ${restaurant.user_rating.aggregate_rating}`}
                        </div>
                        <div className="subtitle is-7">
                          Rating
                        </div>
                      </div>
                      <div className="column">
                        <div className="title is-4">
                        {restaurant.average_cost_for_two}
                        </div>
                        <div className="subtitle is-7">
                          Cost for two
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <div className="title is-4">
                          {restaurant.phone_numbers}
                        </div>
                        <div className="subtitle is-7">
                          Phone number
                        </div>
                      </div>
                      </div>
                    <div className="title is-4">
                      Gallery
                    </div>
                    <div className="columns is-multiline">
                      {
                        restaurant.photos.map((photo:any, key:any) => {
                          return <PhotoView key={key} photo={photo.photo} />
                        })
                      }
                    </div>
                    </>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Restaurant