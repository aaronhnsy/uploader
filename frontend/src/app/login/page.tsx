export default function Login() {
    return (
        <div className="flex items-center justify-center">
            <div className="p-3 rounded bg-gray-900 pointer-events-auto theme-transition">
                <form>
                    <div>
                        <label className="block mb-2 font-medium text-lg text-white" htmlFor="email">Email:</label>
                        <input className="block mb-2 p-2 rounded font-medium text-md text-white bg-gray-800 focus:outline-none focus:ring focus:ring-accent theme-transition"
                               placeholder="email@domain.com"
                               type="email" name="email" id="email"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-lg text-white" htmlFor="password">Password:</label>
                        <input className="block p-2 rounded font-medium text-md text-white bg-gray-800 focus:outline-none focus:ring focus:ring-accent theme-transition"
                               placeholder="••••••••"
                               type="password" name="password" id="password"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
