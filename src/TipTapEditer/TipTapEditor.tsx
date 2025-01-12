"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Tools from "./Tools";

type TipTapEditorProps = {
  content: string | undefined;
  setContent: (content: string) => void;
};

const TipTapEditor = ({ content, setContent }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-md xl:prose-md outline-none",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });
  return (
    <div
      className={"flex min-h-[200px] w-full flex-col gap-3 rounded border p-2"}
    >
      <Tools editor={editor} />
      <EditorContent editor={editor} className={"h-full"} />
    </div>
  );
};

export default TipTapEditor;
