import { useEffect } from "react";
import { useLocation } from "react-router";
import DotGrid from "~/components/DotGrid";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export const meta = () => ([
    { title: 'Rescheck | Auth' },
    { name: 'description', content: 'Log into your Account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    // Remove the automatic redirect - let users see the logout button when authenticated

    return (
        <main className="relative min-h-screen">
            {/* Background DotGrid - Same as home page */}
            <div className="fixed inset-0 z-0">
                <DotGrid
                    dotSize={3}
                    gap={32}
                    baseColor="#1e293b"
                    activeColor="#06ffa5"
                    proximity={140}
                    speedTrigger={60}
                    shockRadius={250}
                    shockStrength={4}
                />
            </div>

            {/* Your auth content goes here */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md mx-auto p-6 bg-black/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl">
                    <h1 className="text-3xl font-bold mb-6 text-white text-center">
                        {auth.isAuthenticated ? 'Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-gray-400 text-center mb-6">
                        {auth.isAuthenticated 
                            ? `Signed in as ${auth.user?.username || 'User'}` 
                            : 'Please sign in to continue'
                        }
                    </p>
                    <div>
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <button className="auth-button animate-pulse">
                                    <p>signing you in</p>
                                </button>
                            </div>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <div className="space-y-4">
                                        <button 
                                            className="auth-button w-full" 
                                            onClick={() => navigate('/')}
                                        >
                                            <p>Proceed To Rescheck</p>
                                        </button>
                                        <button 
                                            className="auth-button w-full bg-red-600 hover:bg-red-700" 
                                            onClick={auth.signOut}
                                        >
                                            <p>Log Out</p>
                                        </button>
                                    </div>
                                ) : (
                                    <button className="auth-button w-full" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Auth;
