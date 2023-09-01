import fetcher from "@/utils/fetcher";
import moon from "@/assets/white.png";
import Image from "next/image";
import axios from "axios";
import { cookies } from "next/headers";
import PostCard from "@/components/PostCard";
import NewPostButton from "@/components/buttons/NewPostButton";
import withAuth from "@/components/withAuth";

const fetchPosts = async () => {
  const token = cookies().get("token")?.value;

  const res = await fetch("https://blog-api-eu.onrender.com/feed/posts", {
    headers: {
      Cookie: "token=" + token,
    },
    // next: {
    //   revalidate: 0,
    // },
  });
  return res.json();
};

const Home = async () => {
  // const data = await fetcher("feed/posts");
  const data = await fetchPosts();

  // console.log(data);
  // const data = await getPosts();
  // console.log(data);
  // const [openModal, setOpenModal] = useState(false);
  // const { userId } = useAuthContext();

  // const { data, error, isLoading, mutate } = useSWR("feed/posts", fetcher);

  // if (isLoading)
  //   return (
  //     <div className="mt-28 ">
  //       <Image className="animate-spin mx-auto" src={moon} width={100} alt="" />
  //     </div>
  //   );

  const { posts } = data;

  console.log(posts);

  return (
    <div className="mx-auto w-[40rem] mt-20">
      <NewPostButton />

      {posts.map((post) => (
        <div key={post._id} className="flex flex-col gap-4">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default Home;
