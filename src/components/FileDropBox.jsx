import React, { useState, useRef, useContext } from "react";
import { FileContext } from "../context/File.context";

const FileDropZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const {File,setFile} = useContext(FileContext)
  const [glow, setGlow] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const droppedFile = Array.from(e.dataTransfer.files)[0];
    setFile(droppedFile);
    setGlow(true);
    setTimeout(() => setGlow(false), 5000);
  };

  const handleFileSelect = (e) => {
    const selectedFile = Array.from(e.target.files)[0];
    setFile(selectedFile);
    setGlow(true);
    setTimeout(() => setGlow(false), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={`
          relative w-full max-w-lg h-full
          flex items-center justify-evenly
          rounded-sm cursor-pointer
          text-white text-center p-2
          transition-all duration-300
          bg-zinc-900
          border-2 border-dashed
          backdrop-blur-md
          ${isDragOver ? "border-cyan-400 bg-cyan-900/20 shadow-[0_0_25px_rgba(0,240,255,0.4)]" : "border-white/30"}
          ${glow ? "animate-pulse border-cyan-500 shadow-[0_0_20px_#0ff]" : ""}
        `}
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />

      {/* List of Uploaded Files */}
      {File ? (
          <div className="w-full max-w-lg text-white text-sm bg-white/5 border border-cyan-400 rounded-sm p-3">
          <p className="mb-2 text-cyan-400 font-semibold">Uploaded Files:</p>
          <ul className="space-y-1 list-disc list-inside text-white/90">
                <li >{File.name}</li>
          </ul>
        </div>
      ) : (
          <>
        <div className="svg h-full w-auto flex justify-center items-center pt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16v-4m0 0l-4 4m4-4l4 4m-4-4V4m0 0l4 4m-4-4L3 8m12 8v-4m0 0l-4 4m4-4l4 4m-4-4V4m0 0l4 4m-4-4L11 8"
              />
          </svg>
        </div>
        <div className="texts h-full flex flex-col justify-center items-center">
          <p className="text-lg">
            {isDragOver ? "Release to upload files" : "Drag & drop files here"}
          </p>
          <p className="text-sm text-white/50 mt-1">or click to select</p>
        </div>
    </>
      )
    }
    </div>
    </div>
  );
};

export default FileDropZone;
