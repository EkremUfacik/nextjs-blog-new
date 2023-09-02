"use client";

import { toast } from "@/components/ui/use-toast";
import { fetchFail, fetchStart, fetchSuccess } from "@/redux/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      dispatch(fetchStart());
      const res = await axios.post(
        "https://blog-api-eu.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      const { userId, token } = res.data;
      const remainingMilliseconds = 60 * 60 * 1000;

      document.cookie = `token=${token}; expires=${new Date(
        new Date().getTime() + remainingMilliseconds * 4
      ).toUTCString()};`;

      const expDate = new Date(
        new Date().getTime() + 4 * remainingMilliseconds
      );

      dispatch(fetchSuccess({ userId, expDate }));
      toast({
        title: "Login Successful",
        description: "You are now logged in",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail(error.response.data.message));
    }
  };

  return (
    <div className="mt-20">
      <div
        className={`bg-red-500 text-white text-center py-2 h-12 border border-zinc-200 w-[40rem] mx-auto flex justify-center items-center rounded-lg ${
          error ? "" : "invisible"
        }`}
      >
        {error}
      </div>
      <form
        action=""
        className="flex flex-col w-[40rem] m-auto border border-zinc-200 px-6 py-8 rounded-lg mt-2 gap-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          <p className="text-lg font-medium text-indigo-800">YOUR EMAIL</p>
          <input
            type="text"
            id="email"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            // onFocus={() => setError("")}
          />
        </label>
        <label htmlFor="password">
          <p className="text-lg font-medium text-indigo-800">PASSWORD</p>
          <input
            type="password"
            id="password"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            // onFocus={() => setError("")}
          />
        </label>
        <button
          className="bg-indigo-600 text-white px-6 py-2 w-28 m-auto rounded hover:bg-indigo-700 transition-all disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
