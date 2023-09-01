"use client";

import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const { setUserId } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const res = await axios.put(
        "https://blog-api-eu.onrender.com/auth/signup",
        {
          email,
          name,
          password,
        },
        { withCredentials: true }
      );

      const { userId } = res.data;
      // setToken(data.token);
      setUserId(userId);

      // localStorage.setItem("token", data.token);
      localStorage.setItem("userId", userId);

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + 4 * remainingMilliseconds
      );
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      router.push("/");
      setLoading(false);
      toast({
        title: "Signup Successful",
        description: "You are now signed up",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="">
      <div
        className={`bg-red-500 text-white text-center py-2 h-12 border border-zinc-200 w-[40rem] mx-auto flex justify-center items-center rounded-lg ${
          error ? "" : "invisible"
        }`}
      >
        {error}
      </div>
      <form
        action=""
        className="flex flex-col w-[40rem] m-auto border border-zinc-200 px-6 py-8 rounded-lg mt-20 gap-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          <p className="text-lg font-medium text-indigo-800">YOUR EMAIL</p>
          <input
            type="email"
            id="email"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            onFocus={() => setError("")}
          />
        </label>
        <label htmlFor="name">
          <p className="text-lg font-medium text-indigo-800">YOUR NAME</p>
          <input
            type="text"
            id="name"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            onFocus={() => setError("")}
          />
        </label>
        <label htmlFor="password">
          <p className="text-lg font-medium text-indigo-800">PASSWORD</p>
          <input
            type="password"
            id="password"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            onFocus={() => setError("")}
          />
        </label>
        <button
          className="bg-indigo-600 text-white px-6 py-2 w-28 m-auto rounded hover:bg-indigo-700 transition-all disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "SIGNUP"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
