import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/styles.sass'
import './reset.css'
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './routes/appContext';
import APIProvider from "./context/APIcall";
import HorairesProvider from "./context/horairesContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <APIProvider>
      <HorairesProvider>
        <AppProvider />
      </HorairesProvider>
    </APIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
