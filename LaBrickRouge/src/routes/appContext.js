import { createContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { APIContext } from "../context/APIcall";
import App from '../App';
import HeaderCarte from '../routes/Carte';
import Reservation from '../routes/reservation';
import AdminAccueil from '../routes/adminAccueil';
import Horaires from '../routes/adminAccueil';
import Event from '../routes/event';
import Login from '../routes/Login';

export const AppContext = createContext(null)

export function AppProvider() {
  const [user, setUser] = useState(false)
  const apiContext = useContext(APIContext);
  const appContext = useContext(AppContext);

  const [data, setData] = useState([]);



  const token = localStorage.getItem('token')

  useEffect(() => {

    if (token) {
      apiContext.postUser(null, null, token).then(data => {
        console.log("data", data);
      });
      if (data) {
        setUser(true)
        // navigate('/admin')

      }
    }


  }, [])

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
      path: '/evenements',
      element: <Event />
    },

    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/admin',
      element: user ? <AdminAccueil /> : <Login />

    },
    {
      path: '/admin/reservation',
      element: user ? (<Horaires />) : (<Login />)

    },

  ])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}