import React, { useState, useEffect } from "react";
import './styles.scss'

const CheckinHistoryFilter = ({onSearch} :any) => {
  const [filters, setFilters] = useState({
    date_from: '',
    date_to: '',
    restaurant_name: '',
    address: '',
    points: '',
  })

  const handleSubmit = (e:any) => {
    e.preventDefault()
    onSearch(filters)
  }
  return (
    <div id="CheckinHistoryFilter" className="container">
    <form onSubmit={handleSubmit}>
    <div className="box">
      <div className="field">
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input className="input" type="date" value={filters.date_from} onChange={(e) => setFilters({...filters, date_from: e.currentTarget.value})} placeholder="Date from" />
            </p>
          </div>
          <div id="dateTo" className="column">
            <p>to</p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="date" onChange={(e) => setFilters({...filters, date_to: e.currentTarget.value})} value={filters.date_to} placeholder="Date to" />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="text" value={filters.restaurant_name} onChange={(e) => setFilters({...filters, restaurant_name: e.currentTarget.value})} placeholder="Restaurant Name" />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="text" value={filters.address} onChange={(e) => setFilters({...filters, address: e.currentTarget.value})} placeholder="Restaurant Location" />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="number" min="1" value={filters.points} onChange={(e) => setFilters({...filters, points: e.currentTarget.value})} placeholder="Points" />
            </p>
          </div>
            <button type="submit" className="button is-primary">Search</button>
        </div>
      </div>
      </div>
      </form>
    </div>
  );
};

export default CheckinHistoryFilter;
