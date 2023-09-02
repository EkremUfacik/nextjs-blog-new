"use client";

import { useRouter } from "next/navigation";
import PostModal from "@/components/PostModal";
import { useState } from "react";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const { userId } = useSelector((state) => state.auth);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const { _id, title, createdAt, creator } = post;

  const isCreator = userId === creator._id;

  const handleDetail = () => {
    router.push("/" + _id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://blog-api-eu.onrender.com/feed/post/${_id}`, {
        withCredentials: true,
      });
      router.refresh();
      toast({
        title: "Delete Successful",
        description: "You have successfully deleted",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Delete Failed",
        description: "You have failed to delete",
      });
    }
  };

  return (
    <div className="">
      <div className="border border-stone-300 p-6 rounded-lg mb-4 shadow-xl ">
        <p className="text-purple-800 font-bold ">
          Posted by {creator.name.toUpperCase()} on{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="my-6 text-2xl font-serif text-sky-900">{title}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 hover:bg-sky-700 hover:text-cyan-200 rounded transition-all font-medium"
            onClick={handleDetail}
          >
            VIEW
          </button>
          {isCreator && (
            <button
              className="px-4 py-2 hover:bg-teal-600 hover:text-teal-300 rounded transition-all font-medium"
              onClick={() => setModalOpen(true)}
            >
              EDIT
            </button>
          )}
          {isCreator && (
            <button
              className="px-4 py-2 hover:bg-red-500 hover:text-white rounded transition-all font-medium"
              onClick={handleDelete}
            >
              DELETE
            </button>
          )}
        </div>
      </div>

      {modalOpen && <PostModal post={post} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default PostCard;
