"use client"; // App Router kullanıyorsan bu satırı ekleyebilirsin.

import React, { useState, useEffect, use } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import {api} from "../../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function UploadPDFDialog({ children }) {
  const [isClient, setIsClient] = useState(false);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const {user} = useUser();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);

  const onFileSelect = (e) =>{
    setFile(e.target.files[0]);
  }

  const OnUpload = async() =>{
    setLoading(true);

    // const postUrl = await generateUploadUrl();

    // const result = await fetch(postUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": file?.type },
    //   body: file,
    // });
    // const { storageId } = await result.json();
    // console.log(storageId);
    // const fileId = uuidv4();
    // console.log(fileId);
    
    // const fileUrl = await getFileUrl({storageId: storageId});

    // const resp = await AddFileEntry({
    //   fileId: fileId,
    //   storageId: storageId, 
    //   fileName:fileName ?? "Untitled File",
    //   fileUrl: fileUrl,
    //   createdBy: user?.primaryEmailAddress.emailAddress
    // })
    // console.log(resp);

    // API Call to Fetch PDF Process Data 
    const ApiResp = await axios.get("/api/pdf-loader");
    console.log(ApiResp);
    setLoading(false);
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Pdf file</DialogTitle>
          <DialogDescription asChild>
            <div className="">
            <h2 className="mt-5">Select a file to upload</h2>
                <div className=" gap-2 p-3">
                {isClient && <input type="file" onChange={(e) =>{onFileSelect(e)}} accept="application/pdf" />} {/* Sadece istemci tarafında göster */}
                </div>
                <div className="mt-2">
                <label>File Name *</label>
                <Input placeholder = "File name" onChange={(e) =>{setFileName(e.target.value)}} />
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload}>
          {loading ? <Loader2Icon className="animate-spin"/> :"Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPDFDialog;
