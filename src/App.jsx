import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Button } from "./components/ui/button"
import AppLayout from "./layouts/AppLayout"
import { Landing } from "./pages/Landing"
import { Onboarding } from "./pages/Onboarding"
import { Job } from "./pages/Job"
import { JobListing } from "./pages/JobListing"
import { Postjob } from "./pages/Postjob"
import Savedjobs from "./pages/Savedjobs"
import { Myjobs } from "./pages/Myjobs"
import { ProtectedRoute } from "./components/ProtectedRoute"



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/onboarding',
        element:
          <ProtectedRoute>
           <Onboarding />
          </ProtectedRoute>,
      },
      {
        path: '/jobs',
        element:
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>,
      },
      {
        path: '/job/:id',
        element:
        <ProtectedRoute>
             <Job />
      </ProtectedRoute>,
     
      },
      {
        path: '/post-job',
        element:
          <ProtectedRoute>
            <Postjob />
          </ProtectedRoute>,
      },
      {
        path: '/my-jobs',
        element:
          <ProtectedRoute>
            <Myjobs />
          </ProtectedRoute>,
      },
      {
        path: '/saved-jobs',
        element:
          <ProtectedRoute>
            <Savedjobs />
          </ProtectedRoute>,


      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />;


}

export default App
