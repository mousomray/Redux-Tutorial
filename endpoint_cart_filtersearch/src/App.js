import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import Home from './Pages/Home'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Productdetails from './Pages/Productdetails'

const App = () => {

    // Create Query Client For React Query
    const queryClient = new QueryClient()

    const myrouting = [
        {
            path: '/',
            component: <Home />
        },
        {
            path: '/product',
            component: <Product />
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
                        {myrouting?.map((routing) => {
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
