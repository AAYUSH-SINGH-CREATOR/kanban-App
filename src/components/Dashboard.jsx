import { supabase } from "./supabase"

export default function Dashboard() {

    async function logouthandler() {
        await supabase.auth.signOut()
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen w-screen">
            <p className="text-center text-4xl text-cyan-700">Welocome To Dashboard</p>
            <button onClick={logouthandler} className="mt-8 border-1 border-blue-700">LOGOUT</button>
        </div>
    )
}