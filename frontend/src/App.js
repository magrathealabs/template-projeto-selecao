import React from "react"
import { ToastContainer } from "react-toastify";
import Routes from "./routes";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
