import axios from 'axios'

const api_url = 'https://api.sandbox.transferwise.tech/v1'

const API = (method:any, url:any, body?:any) => {
  const response = axios({
    method,
    url: `${api_url}/${url}`,
    data: body,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TRANSFERWISE_TOKEN_SB}`,
    },
  });
  return response
}

export default API
