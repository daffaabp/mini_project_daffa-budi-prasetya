import React from "react";
import LoginForm from "../../components/login/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPageFix = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Redirect ke halamann dashboard jika login sukses
    navigate("/dashboard");
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="../../../public/event1.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl font-bold">Event Project App</h1>
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <LoginForm onLoginSuccess={handleLoginSuccess} />

          <hr className="my-6 border-gray-300 w-full" />

          <p className="text-sm text-gray-500 mt-12">
            &copy; 2024 Created by Daffa Budi Prasetya.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPageFix;
