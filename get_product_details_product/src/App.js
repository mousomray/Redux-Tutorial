import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Pages/Nav'
import Product from './Pages/Product'
import Details from './Pages/Details'

const App = () => {
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
            <Route path='/' element={<Product/>}/>
            <Route path='/details/:id' element={<Details/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
