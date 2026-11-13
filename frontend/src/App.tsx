import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './provider/AuthProvider';
import { ProtectedRoute } from './provider/ProtectedRoute';
import { Suspense } from 'react';
import LoadingPage from './components/LoadingPage';
import PopUpModal from './components/PopUpModal';
import { UserProvider } from './hooks/UserContext';

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
          lazy: async () => ({ Component: (await import('./pages/GamePlay')).default })
        }]
      },
      {
        path: "/profile",
        Component: ProtectedRoute,
        children: [{
          index: true,
          lazy: async () => ({ Component: (await import('./components/dashboard/UserProfile')).default })
        }]
      },
      {
        path: "/leaderboard",
        Component: ProtectedRoute,
        children: [{
          index: true,
          lazy: async () => ({ Component: (await import('./pages/Leaderboard')).default })
        }]
      }
    ]
  }
]);

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <PopUpModal/>
      <UserProvider>
        <RouterProvider router={ router }/>
      </UserProvider>
    </Suspense>
  )
}


export default App
