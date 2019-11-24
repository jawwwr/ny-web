import React, { useState, useEffect } from 'react'
import API from 'services/api'
import SOCKETIO from 'services/socketio'
import CheckinHistoryFilter from 'components/CheckinHistoryFilter'

const CheckinHistory: React.FC = ({match}:any) => {
  const [history, setHistory] = useState();
  const [error, setError] = useState();

  useEffect( () => {
    SOCKETIO.on('connect', () => {
      console.log("Connected to socketio - web app.", SOCKETIO.id)
    })

    console.log()

    if(match.params.id) {
      const getCheckinHistory = async () => {
        try {
          const response = await API('GET', `check-in/${match.params.id}`)
          console.log(response)
          setHistory(response.data)
        } catch (api_error) {
          setError(api_error)
        }
    }
    getCheckinHistory()
  }
  }, [])

  return(
    <div id="CheckinHistory">
      <div className="container">
        <div className="card large round">
          {
            history ? 
            <>
              <div className="card-content">
                Loading...
              </div>
            </>
            :
            <>
            <div className="column">
              <CheckinHistoryFilter/>
              <div className="content">
              <table className="table is-resposive">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Restaurant Name</th>
                    <th>Location</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>24/11/2019</td>
                    <td>Vikings</td>
                    <td>Second Floor, North Wing, SM City Cebu, North Reclamation Area, Cebu City</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>24/09/2019</td>
                    <td>Ramen Yushoken</td>
                    <td>Oakridge Business Park, A. S. Fortuna Street, Banilad, Mandaue City</td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td>24/02/2019</td>
                    <td>Buffet 101</td>
                    <td>City Time Square, Mantawe Avenue, Tipolo, Mandaue City</td>
                    <td>10</td>
                  </tr>
                </tbody>

              </table>
              </div>
            </div>
            </>
          }
      </div>
      </div>
    </div>
  )
}

export default CheckinHistory;