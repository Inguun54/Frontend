"use client";
import { Heart, Send, MessageCircle, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LikeType = {
  profileImage: string;
  username: string;
  _id: string;
};

type User = {
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
  likes: LikeType[];
};

const Page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () => {
    const jsonData = await fetch("https://backend-1h61.onrender.com/post");
    const response = await jsonData.json();
    setPosts(response);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto ">
      {posts.map((post) => {
        console.log(posts);
        return (
          <div key={post._id} className="bg-white rounded-lg mb-6">
            <CardHeader className="flex items-center p-4 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src={post.userId.profileImage}
                  alt={post.userId.username}
                  className="w-12 h-12 rounded-full"
                />
                <span className="font-semibold">{post.userId.username}</span>
              </div>
            </CardHeader>

            <CardContent className="w-full">
              <img
                src={post.postImage}
                alt={post.caption}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              <div className="mt-4 text-lg text-gray-800 font-medium">
                {post.caption}
              </div>
            </CardContent>
            <CardFooter className="p-4 flex">
              <div className="flex space-x-6">
                <div className="flex space-x-2 justify-between">
                  <Heart className="cursor-pointer text-gray-700 hover:text-red-600" />
                  <MessageCircle className="cursor-pointer text-gray-700 hover:text-blue-600" />
                  <Send className="cursor-pointer text-gray-700 hover:text-green-600" />
                </div>
                <div>
                  <Bookmark className="cursor-pointer text-gray-700 hover:text-yellow-600" />
                </div>
              </div>
            </CardFooter>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
