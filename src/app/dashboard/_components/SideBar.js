import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import UploadPDFDialog from "./UploadPDFDialog";
import React from "react";

function SideBar() {
  return(
    <div className="shadow-md h-screen p-7">
    <div className="w-full flex justify-center">
    <Image src={"/logo.svg"} alt="logo" width = {80} height={100}  />
    </div>
    <div className="mt-10">
      <UploadPDFDialog>
      <Button>+ Upload PDF</Button>
        </UploadPDFDialog>
      <div className="flex gap-2 items-center p-2 mt-5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
        <Layout/>
        <h2>Workplace</h2>
      </div>
      <div className="flex gap-2 items-center p-2 mt-5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
        <Shield/>
        <h2>Upgrade</h2>
      </div>
      <div className="absolute bottom-24 w-[80%]">
      <Progress value={33} />
      <p className="text-sm mt-1">2 out of 5 Pdf Uploaded</p>
      <p className="text-sm text-gray-400 mt-2">upgrade to Upload more PDF</p>
      </div>
    </div>
    </div>
  );
}

export default SideBar;
