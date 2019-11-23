import axios from 'axios'

const api_url = 'http://localhost:3000'

console.log(process.env)

const API = (method:any, url:any, body?:any) => {
  const response = axios({
    method,
    url: `${api_url}/${url}`,
    data: body,
    headers: {},
  });
  return response
}

export default API