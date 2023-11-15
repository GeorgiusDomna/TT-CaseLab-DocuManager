import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.css';
import Footer from './components/Footer/Footer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
