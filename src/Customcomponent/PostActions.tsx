import { Bookmark, MessageCircle, Heart, Send } from "lucide-react";
import { PostLikesDialog } from "./PostLikesDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type decodedType = {
  username: string;
  userId: string;
};
export const PostActions = ({
  postId,
  likes,
}: {
  postId: string;
  likes: string[];
}) => {
  const [isLikesDialogOpen, setIsOpenLikesDialog] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const handleDialog = () => setIsOpenLikesDialog((prev) => !prev);

  const token = localStorage.getItem("token");
  const decodedToken: decodedType = jwtDecode(token ?? "");
  const userId = decodedToken.userId;

  const router = useRouter();

  const isUserLiked = currentLikes.includes(userId);

  const handleCommentRedirect = (postId: string) => {
    router.push(`/post/comment/${postId}`);
  };

  const handleLike = async () => {
    const response = await fetch(
      "https://ig-server-tain.onrender.com/pressLike",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: postId,
          userId: userId,
        }),
      }
    );
    const res = await response.json();
    if (res.success) {
      setCurrentLikes((prev) => [...prev, userId]);
    }
  };

  const handleDislike = async () => {
    const response = await fetch(
      "https://ig-server-tain.onrender.com/pressUnlike",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: postId,
          userId: userId,
        }),
      }
    );
    const res = await response.json();
    if (res.success) {
      setCurrentLikes((prev) => prev.filter((id) => id !== userId));
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Heart
            className="cursor-pointer mt-4"
            onClick={isUserLiked ? handleDislike : handleLike}
            stroke={isUserLiked ? "red" : "white"}
            fill={isUserLiked ? "red" : "none"}
          />
          <MessageCircle
            className="cursor-pointer mt-4"
            onClick={() => handleCommentRedirect(postId)}
          />
          <Send className="cursor-pointer mt-4" />
        </div>
        <Bookmark className="cursor-pointer mt-4 flex" />
      </div>
      <div style={{ marginLeft: 7 }}>{currentLikes.length} likes</div>
      <div className="font-bold text-ig" onClick={handleDialog}></div>
      <div
        onClick={() => handleCommentRedirect(postId)}
        className="mt-4 text-lg font-medium cursor-pointer hover:underline"
      >
        View Comments
      </div>
    </>
  );
};
export default PostActions;
