"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { jwtDecode } from "jwt-decode";
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const [postId, setPostId] = useState<string>();
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);

  type CommentType = {
    _id: string;
    userId: User;
    comment: string;
    createdAt: string;
  };
  type User = {
    _id: string;
    username: string;
    email: string;
    profileImage: string;
  };
  type decodedType = {
    username: string;
    userId: string;
  };
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
    const token = localStorage.getItem("token");
    const decodedToken: decodedType = jwtDecode(token ?? "");
    const userId = decodedToken.userId;
    const response = await fetch(
      `https://ig-server-tain.onrender.com/getComments/${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    try {
      const response = await fetch(
        `https://ig-server-tain.onrender.com/getComments/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      setComments(data);
    } catch (error) {
      console.error("Error somthinf comments:", error);
    }
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };
  const handleCommentSubmit = async () => {
    if (newComment === "") return;
    try {
      const token = localStorage.getItem("token");
      const decodedToken: decodedType = jwtDecode(token ?? "");
      const userId = decodedToken.userId;
      const response = await fetch(
        `https://ig-server-tain.onrender.com/writeComment`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: newComment,
            userId: userId,
            postId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      setComments((prevComments) => [...prevComments, data]);
      setNewComment("");
    } catch (error) {
      console.error("Error occured posting comment:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {comments?.map((comment, i) => (
        <div key={comment._id} className="text-white">
          <div className="flex gap-5">
            <Avatar className="flex-col gap 4">
              <AvatarImage src={comment.userId?.profileImage} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="hover:text-gray-300 cursor-pointer">
              {comment.userId?.username}
            </div>
            <div>{comment.comment}</div>
          </div>
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="border p-2 w-full rounded-lg bg-slate-800 text-white border-slate-800 flex-col"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-black w-fit text-blue-500  rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Page;
