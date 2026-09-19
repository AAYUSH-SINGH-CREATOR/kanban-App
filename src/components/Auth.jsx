import { useState } from 'react'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">

                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </h2>

                <form className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
                    >
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>

                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}

                    <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>

            </div>
        </div>
    )
}
