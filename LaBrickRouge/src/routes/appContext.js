import { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import HeaderCarte from '../routes/Carte';
import HeaderResa from '../routes/reservation';

export const AppContext = createContext(null)

export function AppProvider() {

  const router = createBrowserRouter([
    {
      path: '/',
      element:  <App />
      
    },
    {
      path: '/carte',
      element: <HeaderCarte />
    },
    {
      path: '/carte/:menu',
      element: <HeaderCarte />
    },
    {
      path: '/reservation',
      element: <HeaderResa />
    },
    
  ])

  return (
    <AppContext.Provider value=''>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}