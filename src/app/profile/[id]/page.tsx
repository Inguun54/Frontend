"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  userId: string;
  profileImage: string;
  following: string[];
  followers: string[];
  posts: string[];
  postImage: string;
};

type Post = {
  _id: string;
  userId?: User[];
  userprofile: UserProfileData;
  postImage: string;
  caption: string;
};

type UserProfileData = {
  user: User;
  userPosts: Post[];
};

const Page = () => {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);

  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://ig-server-tain.onrender.com/user/profile/` + userId,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserProfile(data);
      setIsFollowing(
        data.user.followers.includes(localStorage.getItem("userId") || "")
      );
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const followUser = async () => {
    if (loadingFollow) return;
    setLoadingFollow(true);
    try {
      await fetch("https://ig-server-tain.onrender.com/user/follow", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followedUserId: userId,
        }),
      });

      setUserProfile((prevProfile) => {
        if (!prevProfile) return prevProfile;
        return {
          ...prevProfile,
          user: {
            ...prevProfile.user,
            followers: [
              ...prevProfile.user.followers,
              localStorage.getItem("userId")!,
            ],
          },
        };
      });
      setIsFollowing(true);
    } catch (error) {
      console.log("Error occurred while following");
    } finally {
      setLoadingFollow(false);
    }
  };

  const unfollowUser = async () => {
    if (loadingFollow) return;
    setLoadingFollow(true);
    try {
      await fetch("https://ig-server-tain.onrender.com/user/unfollow", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followedUserId: userId,
        }),
      });

      setUserProfile((prevProfile) => {
        if (!prevProfile) return prevProfile;
        return {
          ...prevProfile,
          user: {
            ...prevProfile.user,
            followers: prevProfile.user.followers.filter(
              (followerId) => followerId !== localStorage.getItem("userId")
            ),
          },
        };
      });
      setIsFollowing(false);
    } catch (error) {
      console.log("Error occurred while unfollowing");
    } finally {
      setLoadingFollow(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserData();
    }
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white">
      <div className="flex">
        <div>
          <img
            src={userProfile.user.profileImage}
            alt="Profile Image"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <button
          className={`rounded-md w-fit h-8 mt-5 ml-2 ${
            isFollowing ? "bg-red-500" : "bg-cyan-500"
          }`}
          onClick={isFollowing ? unfollowUser : followUser}
          disabled={loadingFollow}
        >
          {loadingFollow ? "Following..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
        <div className="flex gap-6 ml-5 mt-6">
          <div>Posts: {userProfile.userPosts.length}</div>
          <div>Followers: {userProfile.user.followers.length}</div>
          <div>Following: {userProfile.user.following.length}</div>
        </div>
      </div>

      <div className="mt-12">
        {userProfile.userPosts.length > 0 ? (
          userProfile.userPosts.map((post) => (
            <div key={post._id} className="mt-4 text-center">
              <div>
                <img
                  className="w-fit h-fit rounded-lg"
                  src={post.postImage}
                  alt="Post Image"
                />
              </div>
              <div className="mt-2">{post.caption}</div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
};

export default Page;
