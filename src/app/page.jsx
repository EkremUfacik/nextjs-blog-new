import PostCard from "@/components/PostCard";
import NewPostButton from "@/components/buttons/NewPostButton";
import { cookies } from "next/headers";

const fetchPosts = async () => {
  const token = cookies()?.get("token")?.value || "";

  try {
    const res = await fetch("https://blog-api-eu.onrender.com/feed/posts", {
      headers: {
        Cookie: "token=" + token,
      },
      // next: {
      //   revalidate: 1,
      //   tags: ["posts"],
      // },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Home = async () => {
  const data = await fetchPosts();

  const { posts } = data;

  return (
    <div className="mx-auto w-[40rem] mt-20">
      <NewPostButton />

      {posts?.map((post) => (
        <div key={post._id} className="flex flex-col gap-4">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default Home;
