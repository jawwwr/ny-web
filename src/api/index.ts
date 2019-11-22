import axios from 'axios'

const api_url = 'https://api.transferwise.com/'

const API = (method:any, url:any, body?:any) => {
  console.log(process.env.REACT_APP_TRANSFERWISE_TOKEN_LIVE);
  const response = axios({
    method,
    url: `${api_url}/${url}`,
    data: body,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TRANSFERWISE_TOKEN_LIVE}`,
    },
  });
  return response
}

export default API
