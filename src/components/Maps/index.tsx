import React from 'react'

const Maps = ({ myLocation, restaurantLocation }: any) => {
    let apiKey = 'AIzaSyDB1a8P7NRBdyVM88hD5JOKMn7M552pEPo'
    let srcUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${myLocation}&destination=${restaurantLocation}`
    return(
        <div>
          <iframe
            title="iframeId"
            width="880"
            height="500"
            src={srcUrl}/>
        </div>
    )
}

export default Maps