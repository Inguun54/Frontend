"use client";

import { House, Compass, Clapperboard, SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

type ProfileType = {
  _id: string;
  profileImage: string;
};

const PageFooter = () => {
  const router = useRouter();
  return (
    <div
      style={{ gap: "82px" }}
      className="w-[100%] sticky top-0 flex justify-center items-center gap-[16px]"
    >
      <div>
        <House
          width={31}
          color="white"
          height={32}
          onClick={() => {
            router.push("/post/");
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
    </div>
  );
};

export default PageFooter;
