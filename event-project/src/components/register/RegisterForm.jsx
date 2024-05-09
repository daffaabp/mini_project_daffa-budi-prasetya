import React from 'react'

const RegisterForm = () => {
   return (
      <form className="mt-6" action="#" method="POST">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" id="name" placeholder="Enter Your Name"
                     className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
                     autoFocus autoComplete="off" required />
            </div>

            <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Username</label>
                  <input type="text" name="username" id="username" placeholder="Enter Username"
                     className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
                     autoComplete="off" required />
            </div>

            <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" id="email" placeholder="Enter Email Address"
                     className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
                     autoComplete="off" required />
            </div>

            <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Password</label>
                  <input type="password" name="password" id="password" placeholder="Enter Password" minLength="6"
                     className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
                     autoComplete="off" required />
            </div>

            <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Confirm Password</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
                     minLength="6"
                     className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
                     autoComplete="off" required />
            </div>
         </div>

         <button type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
            Register
         </button>
      </form>
   );
}

export default RegisterForm
