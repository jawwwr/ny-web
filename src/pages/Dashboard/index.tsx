import React, { useEffect, useState, Suspense } from 'react'
import API from 'services/api'
import SOCKETIO from 'services/socketio'
import Admin from 'pages/Admin';
import './styles.scss'

const Dashboard: React.FC = () => {
  const [splitwise, setSplitwise] = useState({value: '', status: ''});
  const [error, setError] = useState();
  useEffect( () => {

    SOCKETIO.on('connect', () => {
      console.log("Connected to socketio - web app.", SOCKETIO.id)
    })

    const getSplitwise = async () => {
      try {
        const response = await API('GET', "goose")
        setSplitwise(response.data)
      } catch (api_error) {
        setError(api_error)
      }
  }
  getSplitwise()
  }, [])

  return(
    <Admin>
      <div id="Dashboard">
        <div className="title is-4" >Profile</div>
        <Suspense fallback="Loading...">
          <div className="box">
            <div className="columns">
              <div className="column is-four-fifths">
                test
              </div>
              <div className="column">
                <div className="card split-wise">
                  <div className="card-content">
                    <figure className="image is-64x64">
                      <img src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-colored-background.png" alt="image"/>
                    </figure>
                  </div>
                  <footer className="card-footer">
                    <p className="card-footer-item">
                      <span>
                        <a href={splitwise.status === 'authorized' ? '#' : splitwise.value} >{splitwise.status === 'unauthorized' ? 'Authorize Now' : 'You can now split your bills'}</a>
                      </span>
                    </p>
                  </footer> 
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </Admin>
  )
}

export default Dashboard