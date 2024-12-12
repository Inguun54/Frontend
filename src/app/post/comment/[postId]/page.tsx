"use client";

import { useState, useEffect } from "react";

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const [postId, setPostId] = useState<string>();
  type CommentType = {
    _id: string;
    userId: User;
    text: string;
    createdAt: string;
  };
  type User = {
    _id: string;
    username: string;
    email: string;
    profileImage: string;
  };
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const getPostId = async () => {
      const workingParams = await params;
      setPostId(workingParams.postId);
    };

    getPostId();
  }, [params]);

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
  }, [postId]);

  const fetchComments = async (postId: string) => {
    try {
      const response = await fetch(
        `https://backend-1h61.onrender.com/getComments/${postId}`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div>
      <h1 className="text-red-500">{postId}</h1>
      <div>
        {comments?.map((comment, index) => (
          <div key={index} className="comment">
            <div>{comment.text}</div>: {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
