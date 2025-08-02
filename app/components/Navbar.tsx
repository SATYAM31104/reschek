import React from 'react'
import { Link } from 'react-router'

const Component = () => {
    return (
        <nav className='navbar'>
            <Link to="/">
                <p className='text-2xl font-bold text-gradient'>Rescheck</p>
            </Link>
            <Link to="/upload" className='primary-button w-fit'>
                Upload Your Own Resume
            </Link>
        </nav>
    )
}

export default Component
