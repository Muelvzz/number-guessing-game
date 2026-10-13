import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    Component: null,
    children: [
      { index: true, path: "/", Component: LandingPage }
    ]
  }
])

const App = () => <RouterProvider router={ router }/>

export default App
