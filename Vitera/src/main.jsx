import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/Aboutus/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Team from './components/Team/Team.jsx'




const router=createBrowserRouter([
  {
    path: '/',
    element : <Layout/>,
    children : [
      {
        path:"",
        element:<Home/>
      },
      {
        path:"About",
        element:<About/>
      },
      {
        path:"Team",
        element:<Team/>
      },
      {
        path:"Contact",
        element:<Contact/>
      }, 
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
