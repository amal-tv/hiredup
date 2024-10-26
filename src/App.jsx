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
      },
      {
        path : '/jobs',
        element : <JobListing />,
      },
      {
        path : '/job/:id',
        element : <Job />,
      },
      {
        path : '/post-job',
        element : <Postjob />,
      },
      {
        path : '/my-jobs',
        element : <Myjobs />,
      },
      {
        path : '/saved-jobs',
        element : <Savedjobs />,
      }
    ]
  }
])

function App() {
  
      return <RouterProvider router={router} />;

  
}

export default App
