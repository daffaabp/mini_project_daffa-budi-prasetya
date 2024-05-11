import React from "react";
import GoogleLoginButton from "../components/login/GoogleLoginButton";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/register/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-3/5 xl:w-2/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl font-bold">Register</h1>

          <RegisterForm />

          <hr className="my-6 border-gray-300 w-full" />

          {/* <GoogleLoginButton /> */}

          <p className="mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
              Log in here
            </Link>
          </p>

          <p className="text-sm text-gray-500 mt-12">
            &copy; 2024 Talwind - All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="bg-blue-600 hidden lg:block w-2/5 xl:w-1/2 h-screen">
        <img src="../../public/event1.jpg" alt="" className="w-full h-full object-cover"/>
      </div>
    </section>
  );
};

export default RegisterPage;
