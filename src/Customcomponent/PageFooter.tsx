"use client";

import { jwtDecode } from "jwt-decode";
import {
  House,
  Compass,
  Clapperboard,
  SquarePlus,
  UserPen,
} from "lucide-react";
import { useRouter } from "next/navigation";
type decodedType = {
  username: string;
  userId: string;
};
const PageFooter = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const decodedToken: decodedType = jwtDecode(token ?? "");
  return (
    <div
      style={{ gap: "58px" }}
      className="w-full fixed bottom-0 flex justify-center items-center gap-[16px] bg-black"
    >
      <div>
        <House
          width={31}
          color="white"
          height={32}
          onClick={() => {
            router.push("/post");
          }}
        />
      </div>
      <div>
        <Compass width={31} color="white" height={32} />
      </div>
      <div>
        <Clapperboard width={31} color="white" height={32} />
      </div>
      <div>
        <SquarePlus width={31} color="white" height={32} />
      </div>
      <div>
        <UserPen
          width={31}
          color="white"
          height={32}
          onClick={() => {
            router.replace(`/profile/${decodedToken?.userId}`);
          }}
        />
      </div>
    </div>
  );
};

export default PageFooter;
