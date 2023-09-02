"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";

const Navbar = () => {
  const router = useRouter();
  const { userId, expDate } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignout = () => {
    toast({
      title: "Logout Successful",
      description: "You are now logged out",
    });
    router.push("/login");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logout());
  };

  return (
    <nav className="flex justify-between bg-indigo-600 text-white p-6 shadow-2xl text-lg">
      <Link href="/" className="hover:text-slate-300 transition-all">
        Ekrem/U
      </Link>
      <div className="flex gap-6">
        {userId && (
          <Link href="/" className="hover:text-slate-300 transition-all">
            Feed
          </Link>
        )}

        {!userId && (
          <Link href="/login" className="hover:text-slate-300 transition-all">
            Login
          </Link>
        )}
        {!userId && (
          <Link href="/signup" className="hover:text-slate-300 transition-all">
            Signup
          </Link>
        )}
        {userId && (
          <div
            className="hover:text-slate-300 transition-all cursor-pointer"
            onClick={handleSignout}
          >
            Signout
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
