import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess  }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
 
   function handleLogin(e) {
     e.preventDefault();
     const dummyUser = { username: "muchson", password: "muchson1234" };
     if (username === dummyUser.username && password === dummyUser.password) {
       localStorage.setItem("user", JSON.stringify(dummyUser));
       localStorage.setItem("isLoggedIn", true);
       // Call onLoginSuccess function after successful login
       onLoginSuccess();
     } else {
       setErrorMessage("Username or password is incorrect");
     }
   }

  return (
    <form onSubmit={handleLogin} className="mt-6">
      <div>
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          autoFocus
          autoComplete="off"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          minLength="6"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
