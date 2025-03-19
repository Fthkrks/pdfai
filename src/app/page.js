"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import createUser from "../../convex/user";
export default function Home() {

const {user} = useUser();
const createUser = useMutation(api.user.createUser);


useEffect(() => {
  user&&CheckUser();
},[user]);

const CheckUser = async () => {
  const result = await createUser({
    email: user?.primaryEmailAddress?.emailAddress,
    userName: user?.username,
    imageUrl: user?.imageUrl,


  });

  
};


  return (
    <>
      <h2>Hello world!</h2>
      <Button>Click me</Button>
      <UserButton/>
    </>
  );
}
