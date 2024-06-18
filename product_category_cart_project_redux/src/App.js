import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import Product from './Pages/Product'
import Categorydetails from './Pages/Categorydetails'
import Productdetails from "./Pages/Productdetails"
import Cart from './Pages/Cart'


const App = () => {

  // Create Query Client For React Query
  const queryClient = new QueryClient()

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
      component: <Cart />
    }

  ]


  return (
    <>

      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>


    </>
  )
}

export default App
