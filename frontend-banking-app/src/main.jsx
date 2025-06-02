import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import { AuthProvider } from './contexts/AuthContext.jsx';
// Ensure global.css is imported if not in App.jsx, or here.
// If it's in App.jsx, this is fine.
// import './index.css' // Default vite global styles (can be merged/removed)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
