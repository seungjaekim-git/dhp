import Head from 'next/head'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Head>
        <title>Sign in to DhiWise</title>
      </Head>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-4">Sign in to DhiWise</h1>
        <p className="text-gray-400 mb-6">Build web apps & mobile apps at lightning speed</p>
        <div className="flex space-x-4 mb-6">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Google
          </button>
          <button className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded">
            GitHub
          </button>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
            Discord
          </button>
        </div>
        <div className="text-center text-gray-500 mb-4">OR</div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="email">Email address</label>
            <input id="email" type="email" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded" placeholder="johndoe@abc.com" />
          </div>
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="password">Password</label>
            <input id="password" type="password" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded" placeholder="Enter password" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-400">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Sign in</button>
        </form>
        <div className="text-center text-gray-500 mt-6">
          New to DhiWise? <a href="#" className="text-blue-500 hover:underline">Create an account</a>
        </div>
        <div className="text-center text-gray-500 mt-4 text-xs">
          By continuing, you're agreeing to our <a href="#" className="text-blue-500 hover:underline">Terms of service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy policy</a>.
        </div>
      </div>
    </div>
  )
}
