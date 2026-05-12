import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Global Error: ', msg, error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;"><h1>Runtime Error</h1><p>${msg}</p><pre>${error?.stack || ''}</pre></div>`;
  return false;
};

console.log('Main.jsx loaded');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
