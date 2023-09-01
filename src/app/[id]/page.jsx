import moon from "@/assets/white.png";
import axios from "axios";
import Image from "next/image";
import { cookies } from "next/headers";

const getBlogPost = async (id) => {
  const token = cookies().get("token")?.value;
  console.log(token);
  const res = await fetch("https://blog-api-eu.onrender.com/feed/post/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      Cookie: "token=" + token,
    },
    credentials: "include",
  });
  return res.json();
};

const Post = async ({ params }) => {
  const cookieStore = cookies();
  console.log(cookieStore.get("token"));
  const data = await getBlogPost(params.id);
  console.log(data);

  const { content, title, creator, createdAt, imageUrl } = data.post;

  // const { id } = useParams();

  // const { data, isLoading, error } = useSWR("feed/post/" + id, fetcher);

  // console.log(data);

  // if (isLoading)
  //   return (
  //     <div className="mt-28 ">
  //       <Image className="animate-spin mx-auto" src={moon} width={100} alt="" />
  //     </div>
  //   );

  // const { content, title, creator, createdAt, imageUrl } = data.post;

  return (
    <div className="w-[40rem] mx-auto my-16 text-center">
      <p className="text-3xl font-semibold text-indigo-900">{title}</p>
      <p className="my-6 border-b-2 pb-8 border-indigo-800 text-purple-800 font-bold ">
        Created by {creator.name.toUpperCase()} on{" "}
        {new Date(createdAt).toLocaleDateString()}
      </p>

      <div className="my-8">
        <Image
          src={"https://blog-api-eu.onrender.com/" + imageUrl}
          width={300}
          height={180}
          className="mx-auto"
          alt="image"
          priority
        />
      </div>
      <p className="font-medium text-justify">{content}</p>
    </div>
  );
};

export default Post;
