import React, { useState, useEffect } from "react";
import './styles.scss'

const RestaurantFilter = ({onSearch, cuisines_options} :any) => {
  const [cuisines, setCuisines] = useState([])
  const [filters, setFilters] = useState({
    budget: '',
    distance: '',
    number_of_person: '',
    cuisines: '',
  })

  useEffect(() => {
    setCuisines(cuisines_options)
  }, [cuisines_options])

  const handleSubmit = (e:any) => {
    e.preventDefault()
    onSearch(filters)
  }
  return (
    <div id="RestaurantFilter" className="container">
    <form onSubmit={handleSubmit}>
    <div className="box">
      <div className="field">
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input className="input" type="number" min="1" onChange={(e) => setFilters({...filters, budget: e.currentTarget.value})} placeholder="Budget for all" />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="number" min="1" onChange={(e) => setFilters({...filters, distance: e.currentTarget.value})} value={filters.distance} placeholder="Distance in km" />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="number" min="1" value={filters.number_of_person} onChange={(e) => setFilters({...filters, number_of_person: e.currentTarget.value})} placeholder="Number of person" />
            </p>
          </div>
          <div className="field">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select defaultValue={filters.cuisines} onChange={(e) => setFilters({...filters, cuisines: e.currentTarget.value})}>
                  <option>Select</option>
                  {
                    cuisines && cuisines.map((cuisine_obj:any, key) => {
                      return <option key={key} value={cuisine_obj.cuisine.cuisine_id}>{cuisine_obj.cuisine.cuisine_name}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
            <button type="submit" className="button is-primary">Search</button>
        </div>
      </div>
      </div>
      </form>
    </div>
  );
};

export default RestaurantFilter;
