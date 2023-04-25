import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SignUpForm = () => {
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  console.log(password, confirmPass);
  const SignUp = (e) => {
    e.preventDefault();
    let user = { username, email, password, address, phone };
    if (password !== confirmPass) {
      setIsError("Password should be matched!");
      return;
    }
    try {
      setIsError(null);
    } catch (error) {
      console.error(error);
    }
    if (!username || !email || !password) {
      toast.error("Every fields need to be filled");
    } else if (password !== confirmPass) {
      toast.error("Password is not matched");
    } else {
      axios
        .post("http://localhost:4000/users", user)
        .then((res) => {
          toast.success("Sign up is success");
        })
        .catch((err) => {
          toast.error("Fail due to:" + err.message);
        });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer />
      <h1 className="text-3xl font-bold pt-8 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-600">
        Join with us
      </h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 rows-2 my-20 w-max h-max bg-white shadow-md rounded-lg"
        onSubmit={SignUp}
      >
        <div className=" pt-8 pl-5 block">
          <label htmlFor="username" className=" text-neutral-600">
            User Name:{" "}
          </label>
          <input
            id="username"
            className="px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="pt-8 pl-5 block">
          <label htmlFor="email" className="text-neutral-600">
            Email:{" "}
          </label>
          <input
            id="email"
            className="px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="pt-8 pl-5 block">
          <label htmlFor="password" className="text-neutral-600">
            Password:{" "}
          </label>
          <input
            id="password"
            type="password"
            className="px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="pt-8 pl-5 block">
          <label htmlFor="cfpassword" className="text-neutral-600">
            Confirm password:{" "}
          </label>
          <input
            id="cfpassword"
            type="password"
            className="px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6 "
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <span className="relative text-red-600 text-lg ">{isError}</span>
        </div>
        <div className="pt-8 pl-5 block">
          <label className="text-neutral-600">Address: </label>
          <input
            className="px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="pt-8 pl-5 block">
          <label className="text-neutral-600">Phone number: </label>
          <input
            className="px-2 block w-[300px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
          />
        </div>

        <div className=" col-span-full text-center mt-6">
          <button
            type="submit"
            className=" bg-orange-500 text-white py-1 rounded-md w-[300px]"
          >
            Sign up
          </button>
        </div>
        <div className=" col-span-full text-center my-3 text-blue-800 underline">
          <a href="/login">Having account? Login right now</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
