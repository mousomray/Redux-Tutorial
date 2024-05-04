import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            {/* <!-- Just an image --> */}
            <nav class="navbar navbar-light bg-light">
                <Link class="navbar-brand mx-auto" to="/">Product</Link>
            </nav>
        </>
    )
}

export default Nav
