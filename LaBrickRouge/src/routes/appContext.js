import { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import App from '../App';
import HeaderCarte from '../routes/Carte';
import Reservation from '../routes/reservation';
import AdminAccueil from '../routes/adminAccueil';
import Login from '../routes/Login';

export const AppContext = createContext(null)

export function AppProvider() {
  const [user, setUser] = useState({ loggedIn: false })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />

    },
    {
      path: '/carte',
      element: <HeaderCarte />
    },
    {
      path: '/reservation',
      element: <Reservation />
    },

    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/admin',
      element: user.loggedIn ? (<AdminAccueil />) : (<Login />)

    },

  ])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}