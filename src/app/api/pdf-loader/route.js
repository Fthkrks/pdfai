import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";




// const pdfUrl = "https://cheery-caiman-810.convex.cloud/api/storage/9cad2274-dc06-4fea-8d98-f19ab5b20cdf"



export async function GET(req, res) {


    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfUrl = searchParams.get("pdfurl");

    // 1. Load the PDF File 
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContext = "";
    for (let doc of docs) {
        pdfTextContext += doc.pageContent;
    }


    // 2. Split the Text into small chunks 

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap:20,
      });

    const output = await splitter.createDocuments([pdfTextContext]);

    let splitterList =[];
    output.forEach((doc) => {
        splitterList.push(doc.pageContent);
    });


    return NextResponse.json({ message: splitterList });
}