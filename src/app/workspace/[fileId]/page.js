"use client";
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkSpaceHeader from './_components/WorkSpaceHeader';
import PdfViewer from './_components/PdfViewer';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import TextEditor from './_components/TextEditor';

function Workspace() {
    const {fileId} = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId
    });

    useEffect(() => {
        console.log(fileInfo);
        
    }, [fileInfo]);

    const GetFileInfo = async() =>{
        const result = await GetFileRecord({fileId: fileId});
    } 

  return (
    <div> 
        <WorkSpaceHeader/>
        <div className='grid grid-cols-2 gap-5'>
            <div>
                {/* Text Editor */}
                <TextEditor/>
            </div>
            <div>
                {/* PDF Viewer */}
                <PdfViewer fileUrl = {fileInfo?.fileUrl}/>
            </div>
        </div>
    </div>
  )
}

export default Workspace