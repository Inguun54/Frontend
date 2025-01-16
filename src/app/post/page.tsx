"use client";
import { useState, useEffect } from "react";
import { PageContent } from "@/Customcomponent/PageContent";
import { PostLikesDialog } from "@/Customcomponent/PostLikesDialog";
import PageHeader from "@/Customcomponent/PageHeader";
import { PostActions } from "@/Customcomponent/PostActions";
import PageFooter from "@/Customcomponent/PageFooter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

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

  const [users, setUsers] = useState<User[]>([]);

  const profileUsersHandle = async () => {
    const response = await fetch(
      "https://ig-server-tain.onrender.com/getFollowedUsers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();
    setUsers(result.user);
  };
  const router = useRouter();

  useEffect(() => {
    getPosts();
    profileUsersHandle();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-black w-screen">
      <div className="flex overflow-scroll w-full my-6">
        {users?.map((user) => {
          return (
            <div className="flex  flex-col items-center" key={user?._id}>
              <Avatar className="flex gap-4">
                <AvatarImage
                  src={user?.profileImage}
                  className="w-10 h-10 rounded-full flex"
                  onClick={() => {
                    router.push("/profile/" + user._id);
                  }}
                />
              </Avatar>
              <div
                className=" flex font-semibold ml-4 text-white"
                onClick={() => {
                  router.push("/profile/" + user._id);
                }}
              >
                {user?.username}
              </div>
            </div>
          );
        })}
      </div>
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
