"use client";
import { useRouter } from "next/navigation";
import { Heart, Send, MessageCircle, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

type LikeType = {
  profileImage: string;
  username: string;
  _id: string;
};

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

type PostType = {
  _id: string;
  caption: string;
  postImage: string;
  userId: User;
  likes: LikeType[];
  comments: CommentType[];
};

const Page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const router = useRouter();

  const handleCommentRedirect = (postId: string) => {
    router.push(`/post/comment/${postId}`);
  };

  const getPosts = async () => {
    const jsonData = await fetch("https://backend-1h61.onrender.com/post");
    const response = await jsonData.json();
    setPosts(response);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="max-w-xl mx-auto bg-black">
      {posts.map((post) => {
        return (
          <div key={post._id} className="bg-black text-white rounded-lg mb-6">
            <CardHeader className="flex items-center p-4 border-b border-gray-700">
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
              <div className="mt-4 text-lg text-white font-medium">
                {post.caption}
              </div>
            </CardContent>

            <CardFooter className="p-4 flex">
              <div className="flex space-x-6">
                <div className="flex space-x-2 justify-between">
                  <div className="flex items-center space-x-1">
                    <Heart className="cursor-pointer text-white hover:text-red-600" />
                    <span className="text-sm text-white">
                      {post.likes.length}
                    </span>
                  </div>
                  <MessageCircle className=" flex-col cursor-pointer text-white hover:text-blue-600" />
                  <div
                    className="text-gray-500 underline cursor-pointer "
                    onClick={() => handleCommentRedirect(post._id)}
                  >
                    {" "}
                    View all comments
                  </div>
                  <Send className="cursor-pointer text-white hover:text-green-600" />
                </div>
                <div>
                  <Bookmark className="cursor-pointer text-white hover:text-yellow-600" />
                </div>
              </div>
            </CardFooter>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default Page;
