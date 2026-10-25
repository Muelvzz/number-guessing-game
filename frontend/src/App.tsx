import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import GamePlay from './components/dashboard/GamePlay';

import { AuthProvider } from './components/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

// TODO: Add a UseState for the GameDifficulty
// TODO: Create a useContext for the user credentials.

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
      },
      {
        path: "/game",
        Component: ProtectedRoute,
        children: [{index: true, Component: GamePlay}]
      }
    ]
  }
])

const App = () => <RouterProvider router={ router }/>

export default App
