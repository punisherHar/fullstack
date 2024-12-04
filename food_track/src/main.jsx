import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { RecipeProvider } from './context/RecipesContext'
import App from './App.jsx'
import './index.css'
import GoalContext, { TrackProvider } from './context/TrackContext'
import { BrowserRouter } from 'react-router-dom'
import { ProfileProvider } from './context/ProfileContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <RecipeProvider>
            <App />
          </RecipeProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
