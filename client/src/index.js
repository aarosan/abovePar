import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

import App from './App';

import ActiveGame from './pages/ActiveGame';
import AddCourse from './pages/AddCourse';
import Error from './pages/Error';
import GameRecap from './pages/GameRecap';
import GameSetup from './pages/GameSetup';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/addCourse',
        element: <AddCourse />,
      },
      {
        path: '/gameSetup',
        element: <GameSetup />,
      },
      {
        path: '/activeGame',
        element: <ActiveGame />,
      },
      {
        path: '/gameRecap',
        element: <GameRecap />,
      },
    ]
  }
])

const root = createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
)