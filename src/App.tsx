import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Pokepage from './pages/Pokepage';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    }, {
      path: "/:name",
      element: <Pokepage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
