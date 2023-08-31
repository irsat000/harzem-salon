import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import './styles/header.css';
import './styles/footer.css';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter basename={baseUrl ?? undefined}>
    <App />
  </BrowserRouter>
);