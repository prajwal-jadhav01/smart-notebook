import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    
    const [Credentials, setCredentials] = useState({
        Email: "",
        Password: "",
    });
    let navigate=useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Credentials.Email,
        password: Credentials.Password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(response.ok){
        localStorage.setItem('token',json.authToken);
        navigate('/');
    }
    // Handle the response as needed
  };

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <form className="justify-center" onSubmit={onSubmit}>
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 m-auto">
              <h2 className="text-white text-lg font-medium title-font mb-5">
                Log In
              </h2>

              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="Email" /* Updated name to match state key */
                  value={Credentials.Email}
                  onChange={onChange}
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-400"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="Password" /* Updated name to match state key */
                  value={Credentials.Password}
                  onChange={onChange}
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                type="submit"
                className="text-white text-center bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Log In
              </button>
              <p className="text-xs mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Login;
