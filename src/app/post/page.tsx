"use client";
import { useState, useEffect } from "react";
import { PageContent } from "@/Customcomponent/PageContent";
import { PostLikesDialog } from "@/Customcomponent/PostLikesDialog";
import PageHeader from "@/Customcomponent/PageHeader";
import { PostActions } from "@/Customcomponent/PostActions";

type CommentType = {
  _id: string;
  userId: User;
  text: string;
  createdAt: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
};

type PostType = {
  _id: string;
  caption: string;
  postImage: string;
  userId: User;
  likes: string[];
  comments: CommentType[];
};

const Page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [likes, setLikes] = useState<string[]>([]);

  const getPosts = async () => {
    const jsonData = await fetch("https://ig-server-tain.onrender.com/post", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const response = await jsonData.json();
    setPosts(response.posts);
  };

  const toggleLike = () => {};

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-black">
      {posts?.map((post: PostType) => {
        return (
          <div key={post._id} className="bg-black text-white rounded-lg mb-6">
            <PageHeader user={post.userId} />
            <PostLikesDialog postId={post._id} post={post} />

            <PageContent postId={post._id} post={post}></PageContent>
            <PostActions postId={post._id} likes={post.likes}></PostActions>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default Page;
