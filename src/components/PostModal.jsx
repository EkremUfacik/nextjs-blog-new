"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const PostModal = ({ post, setModalOpen }) => {
  const router = useRouter();

  const [file, setFile] = useState("");
  console.log(post);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const image = e.target.image.files[0];

    let formData;
    if (image) {
      formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
    } else {
      formData = {
        title,
        content,
        image: post.imageUrl,
      };
    }

    try {
      if (post) {
        await axios.put(
          `https://blog-api-eu.onrender.com/feed/post/${post._id}`,
          formData,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post(
          "https://blog-api-eu.onrender.com/feed/post",
          formData,
          {
            withCredentials: true,
          }
        );
      }
      setModalOpen(false);
      router.refresh();
      toast({
        title: "Post Successful",
        description: "You have successfully posted",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Post Failed",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div
      className="h-screen w-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center fixed left-0 top-0"
      onClick={() => setModalOpen(false)}
    >
      <form
        className={`w-[40rem] h-[42rem] bg-white p-8 flex flex-col justify-center gap-6 rounded-md ${
          file && "pt-60 overflow-auto"
        }`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-indigo-800 font-bold border-b-2 border-indigo-800 pb-4">
          New Post
        </h1>
        <label htmlFor="">
          <p className="mb-2 font-semibold">TITLE</p>
          <input
            className="border outline-none ps-2 py-1 w-full"
            type="text"
            name=""
            id="title"
            defaultValue={post?.title || ""}
          />
        </label>

        <label htmlFor="image">
          <p className="mb-2 font-semibold">IMAGE</p>
          <input type="file" name="image" id="image" onChange={handleChange} />
        </label>

        <div>
          {file && <Image src={file} alt="file" width={180} height={200} />}
        </div>

        <label htmlFor="content">
          <p className="mb-2 font-semibold">CONTENT</p>
          <textarea
            className="border outline-none ps-2 py-1 w-full resize-none"
            name="content"
            id="content"
            cols="30"
            rows="10"
            defaultValue={post?.content || ""}
          ></textarea>
        </label>
        <div className="flex justify-end gap-4 pe-4">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded shadow-lg hover:bg-red-700 transition-all"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            CANCEL
          </button>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded shadow-lg hover:bg-indigo-700 transition-all"
            type="submit"
          >
            POST
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostModal;
