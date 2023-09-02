import Image from "next/image";
import { cookies } from "next/headers";

const getBlogPost = async (id) => {
  const token = cookies().get("token")?.value;
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
  const data = await getBlogPost(params.id);

  const { content, title, creator, createdAt, imageUrl } = data.post;

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
