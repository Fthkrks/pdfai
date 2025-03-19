import { Bold, Heading1, Heading2, Heading3, Italic, Sparkles, TextQuote } from "lucide-react";
import React from "react";

function EditorExtension({ editor }) {
  if (!editor) {
    return null;
  }


  const onAiClick = () =>{
    console.log("AI Clicked");
    
  }

  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group  flex gap-10">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-500" : ""}
          >
            <Italic />
          </button>
          <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'text-blue-500' : ''}
        >
          <Heading1 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'text-blue-500' : ''}
        >
          <Heading2 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'text-blue-500' : ''}
        >
          <Heading3 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'text-blue-500' : ''}
        >
          <TextQuote />
        </button>
        <button
          onClick={() => onAiClick()}
          className={''}
        >
          <Sparkles/>
        </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
