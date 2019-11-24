import React, { useState, useEffect } from "react";
import './styles.scss'

const RestaurantFilter = ({onSearch, cuisines_options} :any) => {
  const [cuisines, setCuisines] = useState([])
  const [filters, setFilters] = useState()

  useEffect(() => {
    setCuisines(cuisines_options)
  }, [cuisines_options])

  const handleSubmit = (e:any) => {
    e.preventDefault()
    onSearch(filters)
  }

  console.log(filters && filters.budget)
  console.log(filters)
  return (
    <div id="RestaurantFilter" className="container">
    <form onSubmit={handleSubmit}>
    <div className="box">
      <div className="field">
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input className="input" type="number" min="1" onChange={(e) => setFilters({...filters, budget: e.currentTarget.value})} value={filters && filters.budget ? filters.budget : ''} placeholder="Budget for all" />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="number" min="1" onChange={(e) => setFilters({...filters, radius: e.currentTarget.value})} value={filters && filters.radius ? filters.radius : ''} placeholder="Radius in km" />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" disabled={filters === undefined || filters.budget === undefined || filters.budget === ''} type="number" min="1" value={filters && filters.number_of_person ? filters.number_of_person : ''} onChange={(e) => setFilters({...filters, number_of_person: e.currentTarget.value})} placeholder="Number of person" />
            </p>
          </div>
          <div className="field">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select defaultValue={filters && filters.cuisines ? filters.cuisines : ''} onChange={(e) => setFilters({...filters, cuisines: e.currentTarget.value})}>
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
