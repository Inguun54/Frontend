"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Instagram() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUpRedirect = () => {
    router.push("/signup");
  };

  return (
    <div className="flex bg-black justify-center items-center h-screen">
      <Card className="w-[350px] h-fit bg-black border-black">
        <CardHeader>
          <CardTitle className="text-white flex justify-center items-center text-2xl">
            Instagram
          </CardTitle>
          <CardDescription className="flex justify-center items-center"></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-x-5 gap-y-5">
          <Input
            className="bg-[#121212] text-white border-[#858585] border-solid"
            placeholder="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="bg-[#121212] text-white border-[#858585] border-solid"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="bg-blue-500 w-full h-12 flex justify-center items-center text-white">
            Log in
          </Button>
          <div className="flex text-center text-white mt-4 flex-col">
            <span>Don't have an account? </span>
            <button
              onClick={handleSignUpRedirect}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
