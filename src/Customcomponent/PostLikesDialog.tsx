type User = {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
};

type CommentType = {
  _id: string;
  userId: User;
  text: string;
  createdAt: string;
};

type PostType = {
  _id: string;
  caption: string;
  postImage: string;
  userId: User;
  likes: string[];
  comments: CommentType[];
};

export const PostLikesDialog = ({
  postId,
  post,
}: {
  postId: string;
  post: PostType;
}) => {
  return <div></div>;
};
