import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

import { AuthProvider } from './components/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      { path: "/", Component: LandingPage },
      { path: "*", Component: NotFound },
      {
        path: "/home",
        Component: ProtectedRoute,
        children: [{index: true, Component: HomePage}]
      }
    ]
  }
])

const App = () => <RouterProvider router={ router }/>

export default App
