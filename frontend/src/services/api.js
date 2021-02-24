import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = isProduction ? "gittag.herokuapp.com" : process.env.REACT_APP_HOME_URL;
const be_port = isProduction ? "" : `:${process.env.REACT_APP_BE_PORT}`;
const ssl = isProduction ? 's' : '';

const api = axios.create({
  baseURL: `http${ssl}://${redirect_uri}${be_port}`
});

export {
  api,
  client_id,
  redirect_uri,
  be_port,
  ssl
}