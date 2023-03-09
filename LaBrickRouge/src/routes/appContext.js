import { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import HeaderCarte from '../routes/Carte';

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
    
  ])

  return (
    <AppContext.Provider value=''>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}