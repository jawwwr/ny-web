import React, { useState, useEffect } from 'react'
import API from 'services/api'
import API_GEO from 'services/geo-ip'
import SOCKETIO from 'services/socketio'
import RestaurantCard from 'components/RestaurantCard'
import RestaurantFilter from 'components/RestaurantFilter'

var geoOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};


const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState();
  const [filters, setFilters] = useState();
  const [coordinates, setCoordinates] = useState();
  const [cuisines, setCuisines] = useState();
  const [error, setError] = useState();

  useEffect( () => {
    SOCKETIO.on('connect', () => {
      console.log("Connected to socketio - web app.", SOCKETIO.id)
    })
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  }, [])

  useEffect( () => {
    let param_filter = ''
    const getRestaurants = async () => {
      try {
        if(!coordinates) {
          const geo_data = await API_GEO()
          const coordinates = {
            lat: geo_data.data.lat,
            lon: geo_data.data.lon,
          }
          setCoordinates(coordinates)
        }
        if(filters || coordinates) {
          const coor_filter = { ...filters, ...coordinates}
          param_filter = Object.entries(coor_filter).map(([key, val]) => `${key}=${val}`).join('&');
        }
        const response = await API('GET', `restaurants?${param_filter}`)
        setRestaurants(response.data.restaurants)
      } catch (api_error) {
        setError(api_error)
      }
  }
  getRestaurants()
  }, [filters, coordinates])

  useEffect(()=> {
    let param_coordinates = ''
    const getCuisines = async () => {
      try {
        if(coordinates){
          param_coordinates = Object.entries(coordinates).map(([key, val]) => `${key}=${val}`).join('&');
          const cuisines = await API('GET', `cuisines?${param_coordinates}`)
          setCuisines(cuisines.data.cuisines)
        }
      }catch(api_error) {
        setError(api_error)
      }
    }
    getCuisines()
  }, [coordinates])

  const onSearch = (filters:any) => {
    setFilters(filters)
  }
  
  const geoSuccess = (pos:any) => {
    var crd = pos.coords;
    const coordinates = {
      lat: crd.latitude,
      lon: crd.longitude
    }
    setCoordinates(coordinates)
  }

  const geoError = (err:any) => {
    setCoordinates(false)
  }

  return(
    <>
    <div id="Home">
    <RestaurantFilter onSearch={onSearch} cuisines_options={cuisines}/>
      <div className="container">
        <div className="columns is-multiline">
          {
            !restaurants ? <div className="column is-one-third">Loading...</div> : ''
          }
          {
            restaurants && restaurants.map((restaurant :any, key :any) => {
              return <RestaurantCard key={key} restaurant={restaurant.restaurant} />
            })
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Home