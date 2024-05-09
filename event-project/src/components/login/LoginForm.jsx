import React from 'react'

const LoginForm = () => {
   return (
      <form className="mt-6" action="#" method="POST">
         <div>
            <label className="block text-gray-700">Email Address</label>
            <input type="email" name="" id="" placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus autoComplete="off" required />
         </div>

         <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="" id="" placeholder="Enter Password" minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required />
         </div>

         <div className="text-right mt-2">
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
            </a>
         </div>

         <button type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
            Log In
         </button>
      </form>
   );
}

export default LoginForm
