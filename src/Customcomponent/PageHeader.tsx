import { CardHeader } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/app/post/page";

type ProfileType = {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
};

const PageHeader = ({ user }: { user: User }) => {
  const { username, profileImage } = user;

  const profileUsersHandle = async () => {
    const response = await fetch(
      "https://ig-server-tain.onrender.com/getUsers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  const router = useRouter();
  return (
    <>
      <CardHeader className="flex flex-row gap-5 p-4 border-b border-gray-700 ">
        <Avatar className="flex gap-4">
          <AvatarImage
            src={profileImage}
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
          {username}
        </div>
      </CardHeader>
    </>
  );
};
export default PageHeader;
