import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Layout } from './components/Layout/Layout';
import Debts from './components/Debts/Debts';
import UserMovements from './components/UserMovements/UserMovements';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from './pages/homepage/homepage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout>
      <Router>
        <></>
        {/* Router paths | TO DO: ADD PAGES */}
        <Routes>
          <Route path='/' Component={HomePage} />
        </Routes>
      </Router>
    </Layout>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
