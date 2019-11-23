import React from 'react'
import { Link } from "react-router-dom";

const RestaurantCard = (props :any) => {
  const { restaurant, src } = props
  return(
      <div className="column is-one-third">
        <div className="card large round">
          <div className="card-image ">
            <figure className="image">
                <img src={restaurant.featured_image} alt="Image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4 no-padding">{restaurant.name}</p>
                <p className="subtitle is-7">Cuisines: {restaurant.cuisines}</p>
              </div>
            </div>
            <div className="content">
            {
              !src ?
              <>
                <span className="has-text-weight-bold">Rating</span>: <span className="is-6">{`${restaurant.user_rating.rating_text}: ${restaurant.user_rating.aggregate_rating}`}</span>
                  <br />
                  <span className="has-text-weight-bold">Average cost for two</span>: <span className="is-6">{restaurant.average_cost_for_two}</span>
                <br/>
              </> : ''
            }
              <span className="has-text-weight-bold">Address</span>:<br/> <span className="is-6">{restaurant.location.address}</span>
              <br/>
              <br/>
              <div className="tags">
                {
                  restaurant.highlights.map((tag:any, key:any) => {
                  return <span key={key} className="tag is-primary is-normal">{tag}</span>
                  })
                }
              </div>
            </div>
          </div>
          {
            !src ?
            <footer className="card-footer">
            <a href="#" className="card-footer-item">Favorite</a>
            <Link to={`/restaurants/${restaurant.id}`} className="card-footer-item">View</Link>
          </footer> : ''
          }
        </div>
      </div>
  )
}

export default RestaurantCard