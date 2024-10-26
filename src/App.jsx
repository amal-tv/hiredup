import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Button } from "./components/ui/button"
import AppLayout from "./layouts/AppLayout"
import { Landing } from "./pages/Landing"
import { Onboarding } from "./pages/Onboarding"



const router = createBrowserRouter([
  {
    element : <AppLayout />,
    children : [
      {
        path : '/',
        element :<Landing/>,
      },
      {
        path : '/onboarding',
        element : <Onboarding />,
      }
    ]
  }
])

function App() {
  
      return <RouterProvider router={router} />;

  
}

export default App
