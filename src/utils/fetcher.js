import axios from "axios";
import { cookies } from "next/headers";

const fetcher = async (url) => {
  const token = cookies().get("token")?.value;

  // const API_TOKEN = localStorage.getItem("token");
  const res = await axios("https://blog-api-eu.onrender.com/" + url, {
    // next: {
    //   revalidate: 60,
    // },
    headers: {
      Cookie: "token=" + token,
    },
    withCredentials: true,
  });

  return res.data;
};

export default fetcher;
