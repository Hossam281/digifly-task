"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Redo,
  Undo,
  Left,
  Right,
  Center,
} from "@/components/svgs";

const TextEditor: React.FC = () => {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [center, setCenter] = useState(false);
  const [textHistory, setTextHistory] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newText = editorRef.current?.innerText || "";
    if (textHistory[historyIndex] !== newText) {
      setTextHistory((prev) => [...prev.slice(0, historyIndex + 1), newText]);
      setHistoryIndex((prev) => prev + 1);
    }
  }, [historyIndex]);

  const handleTextChange = () => {
    const newText = editorRef.current?.innerText || "";
    setTextHistory((prev) => [...prev.slice(0, historyIndex + 1), newText]);
    setHistoryIndex((prev) => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      editorRef.current!.innerText = textHistory[historyIndex - 1];
    }
  };

  const redo = () => {
    if (historyIndex < textHistory.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      editorRef.current!.innerText = textHistory[historyIndex + 1];
    }
  };

  const toggleFormat = (format: string) => {
    editorRef.current?.focus();
    if (format === "bold") {
      setBold(!bold);
    }
    if (format === "italic") {
      setItalic(!italic);
    }
    if (format === "underline") {
      setUnderline(!underline);
    }
    if (format === "left") {
      setLeft(!left);
      setRight(false);
      setCenter(false);
    }
    if (format === "right") {
      setRight(!right);
      setLeft(false);
      setCenter(false);
    }
    if (format === "center") {
      setCenter(!center);
      setLeft(false);
      setRight(false);
    }
  };

  return (
    <div className="bg-[#F8F7FC] border rounded w-[99%] mx-auto mb-8">
      <div className="flex space-x-2 gap-3 items-center px-4 h-12">
        <div>
          <Undo onClick={undo} className="cursor-pointer w-6 h-6" />
        </div>
        <div>
          <Redo onClick={redo} className="cursor-pointer w-6 h-6" />
        </div>
        <div className="flex items-center h-full">
          <div
            className={` w-12 h-full flex items-center justify-center cursor-pointer ${
              bold ? "bg-[#49BD88] fill-white" : ""
            }`}
            onClick={() => toggleFormat("bold")}
          >
            <Bold className="w-6 h-6" />
          </div>
          <div
            className={`w-12  h-full flex items-center justify-center cursor-pointer ${
              italic ? "bg-[#49BD88] fill-white" : ""
            }`}
            onClick={() => toggleFormat("italic")}
          >
            <Italic className="w-6 h-6" />
          </div>
          <div
            className={`w-12  h-full flex items-center justify-center cursor-pointer ${
              underline ? "bg-[#49BD88] fill-white" : ""
            }`}
            onClick={() => toggleFormat("underline")}
          >
            <Underline className="w-6 h-6" />
          </div>
          <div
            className={`w-12  h-full flex items-center justify-center cursor-pointer ${
              left ? "bg-[#49BD88] fill-white" : ""
            }`}
            onClick={() => toggleFormat("left")}
          >
            <Left className="w-6 h-6" />
          </div>
          <div
            className={`w-12  h-full flex items-center justify-center cursor-pointer ${
              center ? "bg-[#49BD88] fill-white" : ""
            }`}
            onClick={() => toggleFormat("center")}
          >
            <Center className="w-6 h-6" />
          </div>
          <div
            className={`w-12  h-full flex items-center justify-center cursor-pointer ${
              right ? "bg-[#49BD88] fill-white" : ""
            }`}
            onClick={() => toggleFormat("right")}
          >
            <Right className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div
        className={
          "editor h-[300px] bg-white p-4 border rounded" +
          (bold ? " font-bold" : "") +
          (italic ? " italic" : "") +
          (underline ? " underline" : "") +
          (left ? " text-left" : "") +
          (right ? " text-right" : "") +
          (center ? " text-center" : "")
        }
        contentEditable
        ref={editorRef}
        onInput={handleTextChange}
      ></div>
    </div>
  );
};

export default TextEditor;
