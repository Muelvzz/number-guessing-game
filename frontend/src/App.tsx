import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './components/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Suspense } from 'react';
import LoadingPage from './components/LoadingPage';

// TODO: Add a UseState for the GameDifficulty
// TODO: Create a useContext for the user credentials.

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        path: "/",
        lazy: async () => ({ Component: (await import('./pages/LandingPage')).default })
      },
      {
        path: "*",
        lazy: async () => ({ Component: (await import('./pages/NotFound')).default })
      },
      {
        path: "/home",
        Component: ProtectedRoute,
        children: [{
          index: true, 
          lazy: async () => ({ Component: (await import('./pages/HomePage')).default })
        }]
      },
      {
        path: "/game",
        Component: ProtectedRoute,
        children: [{
          index: true, 
          lazy: async () => ({ Component: (await import('./components/dashboard/GamePlay')).default })
        }]
      }
    ]
  }
]);

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={ router }/>
    </Suspense>
  )
}


export default App
