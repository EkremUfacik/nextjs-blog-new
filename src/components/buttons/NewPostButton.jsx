"use client";

import React, { useState } from "react";
import PostModal from "../PostModal";

const NewPostButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="text-center my-8">
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded shadow-lg hover:bg-indigo-700 transition-all"
          onClick={() => setModalOpen(true)}
        >
          NEW POST
        </button>
      </div>
      {modalOpen && <PostModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default NewPostButton;
