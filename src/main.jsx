import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Main from './component/Main.jsx'
import Phones from './component/Phones.jsx'
import Phone from './component/Phone.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <Main/>,
  children: [
    {
      path: "/phones",
      element: <Phones/>,
      // parse response and normalize common envelope shapes (e.g. { data: [...] })
      loader: () => fetch('http://localhost:4000/phones')
        .then(res => res.json())
        .then(body => body.data ?? body)
    },
    {
      path: "/phone/:id",
      element: <Phone/>,
      // parse response and normalize wrapper: return body.data || body
      loader: ({params}) => fetch(`http://localhost:4000/phone/${params.id}`)
        .then(res => res.json())
        .then(body => body.data ?? body)
    }
  ]
}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
