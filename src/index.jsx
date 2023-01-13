import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { JournalApp } from './JournalApp';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </React.StrictMode>
);