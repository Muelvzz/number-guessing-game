import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    Component: null,
    children: [
      { index: true, path: "/", Component: LandingPage },
      { index: true, path: "/contact-us", Component: ContactUs },
      { index: true, path: "/login", Component: Login },
      { index: true, path: "/register", Component: Register },
    ]
  }
])

const App = () => <RouterProvider router={ router }/>

export default App
