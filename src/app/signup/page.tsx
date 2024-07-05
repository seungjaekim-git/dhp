import * as React from "react"

export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="w-1/2 p-8">
            <h1 className="text-3xl font-bold text-white mb-4">DhiWise</h1>
            <p className="text-gray-400 mb-6">DhiWise enables you to develop enterprise-grade applications in low-code and pro-code simultaneously.</p>
            <h2 className="text-2xl font-bold text-white mb-4">All in hours, not weeks.</h2>
            <p className="text-gray-400 mb-6">No Credit Card Required.<br />Try DhiWise today, it's free to start with.</p>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Write less, Build more, No Limits
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Built for Developers
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Own your source code
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Your go-to frontend and mobile app development platform
              </li>
            </ul>
          </div>
          <div className="w-1/2 bg-gray-900 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Sign up for free!</h2>
            <div className="flex flex-col space-y-4">
              <button className="w-full bg-white text-gray-900 py-2 px-4 rounded flex items-center justify-center">
                <img src="/google-icon.svg" alt="Google" className="w-6 h-6 mr-2" />
                Continue with Google
              </button>
              <button className="w-full bg-gray-700 text-white py-2 px-4 rounded flex items-center justify-center">
                <img src="/github-icon.svg" alt="GitHub" className="w-6 h-6 mr-2" />
                Continue with GitHub
              </button>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded flex items-center justify-center">
                <img src="/discord-icon.svg" alt="Discord" className="w-6 h-6 mr-2" />
                Continue with Discord
              </button>
            </div>
            <div className="text-gray-500 mt-6">
              Already have an account? <a href="#" className="text-blue-500 hover:underline">Sign in</a>
            </div>
            <div className="text-gray-500 mt-4 text-xs">
              By continuing, you're agreeing to our <a href="#" className="text-blue-500 hover:underline">Terms of service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy policy</a>.
            </div>
          </div>
        </div>
      </div>
    );
}