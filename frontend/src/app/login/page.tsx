export default function Login() {
    return (
        <div className="flex items-center justify-center absolute top-0 right-0 bottom-0 left-0 pointer-events-none">
            <div className="p-3 rounded bg-gray-800 pointer-events-auto">
                <form>
                    <div>
                        <label className="block mb-2 font-medium text-lg text-white" htmlFor="email">Email:</label>
                        <input className="block mb-2 p-2 rounded font-medium text-md text-white bg-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
                               placeholder="email@domain.com"
                               type="email" name="email" id="email"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-lg text-white" htmlFor="password">Password:</label>
                        <input className="block p-2 rounded font-medium text-md text-white bg-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
                               placeholder="••••••••"
                               type="password" name="password" id="password"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
