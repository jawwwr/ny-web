import axios from 'axios'

const geo_host = 'http://ip-api.com/json/'

console.log(process.env)

const API_GEO = () => {
    const response = axios({
        method: 'get',
        url: geo_host,
    });
    return response
}

export default API_GEO