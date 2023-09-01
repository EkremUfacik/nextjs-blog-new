"use client";

import Login from "@/app/login/page";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const IsLoginProvider = ({ children }) => {
  const { userId } = useSelector((state) => state.auth);
  const router = useRouter();
  if (!userId) {
    return <Login />;
  }
  return children;
};

export default IsLoginProvider;
