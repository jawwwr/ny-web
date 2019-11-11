import React from 'react'
import Navbar from 'components/Navbar'

const Home: React.FC = () => {
  return(
    <div id="Home">
      <Navbar />
      <div className="container">
        <div className="title is-4">Home</div>
      </div>
    </div>
  )
}

export default Home