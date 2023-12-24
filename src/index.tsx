import React from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { AppProvider } from './Contexts/AppContext';
import { App } from './Components/App';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { NotFound } from './Pages/404';
import { Thread } from './Pages/Thread';
import {Profile} from './Pages/Profile'
import {NewPost} from './Pages/NewPost'

// process.env.URL = 'http://localhost:3000';
export const API_URL = 'http://localhost:5000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is now a layout component for your routes
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'newpost', element: <NewPost />},
      {
        path: '/:threadId',
        element: <Thread />
      },
      {
        path: '/u/:username',
        element: <Profile />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
