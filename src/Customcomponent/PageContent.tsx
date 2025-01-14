import { useRouter } from "next/navigation";

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
  likes: string[];
  comments: CommentType[];
};

export const PageContent = ({
  postId,
  post,
}: {
  postId: string;
  post: PostType;
}) => {
  return (
    <div>
      <img
        src={post.postImage}
        className="w-full h-80 object-cover rounded-t-lg"
      />

      <div className="mb-3 mt-4 text-2xl font-mono rounded-md">
        {post.caption}
      </div>
    </div>
  );
};

export default PageContent;
