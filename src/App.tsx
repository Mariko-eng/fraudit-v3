import { createBrowserRouter ,RouterProvider } from "react-router-dom"
import PublicLayout from "./components/layouts/PublicLayout"
import Protectedlayout from "./components/layouts/ProtectedLayout"
import PrivateLayout from "./components/layouts/PrivateLayout"
import IncidentList from "./pages/Incident/list"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import IncidentDetail from "./pages/Incident/detail"

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protectedlayout/>,
      children: [
        {
          path: "",
          element: <Login/>}
      ]
    },
    {
      path: "about-us",
      element: <PublicLayout/>,
      children: [
        {
          path: "",
          element: <>About Us</>}
      ]
    },
    {
      path: "faq",
      element: <PublicLayout/>,
      children: [
        {
          path: "",
          element: <>About Us</>}
      ]
    },
    {
      path: "home",
      element: <PrivateLayout/>,
      children: [
        {
          path: "",
          element: <Dashboard/>},
        {
          path: "incidents",
          element: <IncidentList/>
        },
        {
          path: "incidents/:id",
          element: <IncidentDetail/>
        }
      ]
    }
  ])

  return <RouterProvider router={router} />

}

export default App