import React from 'react'
import { Link } from 'react-router'
import { usePuterStore } from '~/lib/puter'

const Component = () => {
    const { auth } = usePuterStore();
    
    return (
        <nav className='navbar'>
            <Link to="/">
                <p className='text-2xl font-bold text-gradient'>Rescheck</p>
            </Link>
            <div className="flex items-center gap-4">
                <Link to="/upload" className='primary-button w-fit'>
                    Upload Your Own Resume
                </Link>
                {auth.isAuthenticated ? (
                    <button 
                        onClick={auth.signOut}
                        className='primary-button w-fit bg-red-600 hover:bg-red-700'
                    >
                        Log Out
                    </button>
                ) : (
                    <Link to="/auth" className='primary-button w-fit'>
                        Log In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Component
