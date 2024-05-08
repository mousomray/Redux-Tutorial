import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './Pages/Product'
import Nav from './Common/Nav'

const App = () => {
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
            <Route path='/' element={<Product/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
