import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';

import { AuthProvider } from './components/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      { index: true, path: "/", Component: LandingPage },
      { index: true, path: "/contact-us", Component: ContactUs },
      { index: true, path: "/login", Component: Login },
      { index: true, path: "/register", Component: Register },
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
