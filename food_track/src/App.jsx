import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import NotFoundPage from './components/NotFoundPage'
import HomePage from './components/home/HomePage' 
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'
import EditGoalsPage from './components/goalsPage/EditGoalsPage'
import GoalsPage from './components/goalsPage/GoalsPage'
import Recipes from './components/recipes/Recipes'
import History from './components/history/History'
import PrivateRoute from './utils/privateRoute.jsx'
import { Button } from './components/ui/button'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useRoutes } from "react-router-dom";
import './App.css'
import { TrackProvider } from './context/TrackContext'
import GoalsPageWrapper from './components/goalsPage/GoalsPageWrapper'
import FavoriteRecipes from './components/favorites/FavoritesRecipes'




function App() {
  let element = useRoutes(
    [
      {
        path:'/',
        element:<PrivateRoute component={HomePage}/>,
        errorElement:<NotFoundPage/>
      },
      {
        path:'/login',
        element:<LoginPage/>,
        errorElement:<NotFoundPage/>
      },
      {
        path:'/register',
        element:<RegisterPage/>,
        errorElement:<NotFoundPage/>
      },
      {
        path:'/goals',
        element:<PrivateRoute component={GoalsPage}/>,
        errorElement:<NotFoundPage/>
      },
      {
        path:'/edit-goals',
        element:<PrivateRoute component={GoalsPageWrapper}/>,
        errorElement:<NotFoundPage/>
      },
      {
        path:'/recipes',
        element:<PrivateRoute component={Recipes}/>,
        errorElement:<NotFoundPage/>
      },
      {
        path:'/favorite-recipes',
        element:<PrivateRoute component={FavoriteRecipes}/>,
        errorElement:<NotFoundPage/>
      },
      {
        path:'/history',
        element:<PrivateRoute component={History}/>,
        errorElement:<NotFoundPage/>
        
      }
      
    ]
  )

  return element
  
}

export default App
