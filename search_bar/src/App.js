import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import Home from './Pages/Home'
import Product from './Pages/Product'


const App = () => {

  // Create Query Client For React Query
  const queryClient = new QueryClient()

  const public_routing = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/product',
      component: <Product />
    }
  ]

  return (
    <>

      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {public_routing?.map((routing) => {
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
