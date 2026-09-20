import { useState } from 'react'
import { supabase } from './supabase'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showpass, setShowpass] = useState(false);

    async function AuthHandler(e) {
        e.preventDefault();
        setLoading(true)

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password })
                if (error) throw error
            }
            else {
                const { error } = await supabase.auth.signUp({ email, password })
                if (error) throw error
                alert('Check your email for the login link!')
            }
        }
        catch (error) {
            console.log(error)
        }

        setLoading(false);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-700">
            <div className="w-full max-w-md rounded-lg bg-zinc-900 p-8 shadow-md">

                <h2 className="mb-6 text-center text-2xl font-bold text-gray-100">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </h2>

                <form className="space-y-4" onSubmit={AuthHandler}>

                    <div>
                        <label className="block text-sm font-medium text-gray-100">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            className="mt-1 w-full text-white rounded-md border border-gray-300 p-2"
                            placeholder='abc@gmail.com'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}

                        />
                    </div>

                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-100">
                            Password
                        </label>
                        <input
                            type={showpass? "text" : "password"}
                            required
                            className="mt-1 w-full text-white rounded-md border border-gray-300 p-2"
                            placeholder='password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <span onClick={()=> setShowpass((prev)=> !prev)} className='absolute text-white bottom-2.5 right-5 text-2xl'>
                            {showpass? <IoEyeOffOutline/> : <IoEyeOutline/> }
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
                    >
                {loading? 'processing' : isLogin ? 'Log In' : 'Sign Up'}
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
