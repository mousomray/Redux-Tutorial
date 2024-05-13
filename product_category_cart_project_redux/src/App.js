import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './Pages/Product'
import Categorydetails from './Pages/Categorydetails'
import Productdetails from "./Pages/Productdetails"
import Cart from './Pages/Cart'


const App = () => {

  const private_routing = [
    {
      path: '/',
      component: <Product />
    },
    {
      path: '/categorydetails/:category',
      component: <Categorydetails />
    },
    {
      path: '/productdetails/:id',
      component: <Productdetails />
    },
    {
      path: '/cart',
      component: <Cart/>
    }

  ]


  return (
    <>
      <Router>

        <Routes>
          {private_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={routing?.component} />
              </>
            )
          })}
        </Routes>
      </Router>
    </>
  )
}

export default App
