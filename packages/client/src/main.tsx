import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/app/app'
import './main.scss'
import { ProfilePage } from './pages/profile/profile'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProfilePage />
  </React.StrictMode>
)
