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

export default function Instagram() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    if (!email.includes("@")) {
      return setError("Email must include @");
    }
    if (password.length < 8) {
      return setError("Password must contain at least 8 characters");
    }
    setError("");
    alert("Successfully signed up!");
  };

  return (
    <div className="flex bg-black justify-center items-center h-screen ">
      <Card className="w-fit h-fit bg-black border-black">
        <CardHeader>
          <CardTitle className="text-white flex justify-center items-center text-2xl">
            Instagram
          </CardTitle>
          <CardDescription className="flex justify-center items-center text-base text-[#A8A8A8]">
            Sign up to see photos and videos from your friends.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-x-5 gap-y-3">
          <Input
            className="bg-[#121212] text-white border-[#858585] border-solid rounded"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            className="bg-[#121212] text-white border-[#858585] border-solid"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            className="bg-[#121212] text-white border-[#858585] border-solid"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {error && <div className="text-red-500 ">{error}</div>}
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
        <CardFooter>
          <Button
            onClick={handleButtonClick}
            className="bg-blue-500 w-full h-12 flex justify-center items-center text-white "
          >
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
