import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = isProduction ? process.env.REACT_APP_HOME_URL : "gittag.herokuapp.com";
const port = isProduction ? `:${process.env.REACT_APP_PORT}` : "";

const api = axios.create({
  baseURL: `https://${redirect_uri}${port}`
});

export {
  api,
  client_id,
  redirect_uri,
  port
}