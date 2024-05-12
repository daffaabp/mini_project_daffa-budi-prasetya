import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"; // untuk melakukan redirect

const LoginForm = () => {

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState();
   const navigate = useNavigate();

   function handleLogin(e) {
      e.preventDefault()
      const dummyUser = { username: "daffaabp", password: "password" };
      if (username === dummyUser.username && password === dummyUser.password) {
            localStorage.setItem("user", JSON.stringify(dummyUser));
            localStorage.setItem("isLoggedIn", true);
            navigate("/dashboard")
         // console.log("username bener bang");
      } else {
         setErrorMessage("username atau password anda salah");
      }
      console.log(username + password);
   }
   

   return (
      <form className="mt-6" onSubmit={handleLogin}>
         <div>
            <label className="block text-gray-700">Username</label>
            <input type="text" name="username" id="username" placeholder="Enter Username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" onChange={(e) => setUsername(e.target.value)}
                  autoFocus autoComplete="off" required />
         </div>

         <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter Password" minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" onChange={(e) => setPassword(e.target.value)}
                  required />
         </div>

         {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

         <button type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
            Log In
         </button>
      </form>
   );
}

export default LoginForm
