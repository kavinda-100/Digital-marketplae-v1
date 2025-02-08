import React from "react";
import ToolButton from "./ToolButton";
import { type Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  CodeIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  Braces,
  Strikethrough,
  ListOrdered,
  Logs,
  Heading1,
} from "lucide-react";

const tools = [
  {
    name: "heading",
    icon: <Heading1 />,
  },
  {
    name: "bold",
    icon: <BoldIcon />,
  },
  {
    name: "italic",
    icon: <ItalicIcon />,
  },
  {
    name: "underline",
    icon: <UnderlineIcon />,
  },
  {
    name: "strike",
    icon: <Strikethrough />,
  },
  {
    name: "code",
    icon: <CodeIcon />,
  },
  {
    name: "codeBlock",
    icon: <Braces />,
  },
  {
    name: "orderedList",
    icon: <ListOrdered />,
  },
  {
    name: "bulletList",
    icon: <Logs />,
  },
  {
    name: "left",
    icon: <AlignLeftIcon />,
  },
  {
    name: "center",
    icon: <AlignCenterIcon />,
  },
  {
    name: "right",
    icon: <AlignRightIcon />,
  },
] as const;

type ToolProps = {
  editor: Editor | null;
};

type ToolNameType = (typeof tools)[number]["name"];

const Tools = ({ editor }: ToolProps) => {
  const handleToolClick = (name: ToolNameType) => {
    // if (editor === null) {
    //   console.log("Editor is null");
    //   return;
    // }
    switch (name) {
      case "bold":
        editor?.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor?.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor?.chain().focus().toggleUnderline().run();
        break;
      case "strike":
        editor?.chain().focus().toggleStrike().run();
        break;
      case "heading":
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "code":
        editor?.chain().focus().toggleCode().run();
        break;
      case "codeBlock":
        editor?.chain().focus().toggleCodeBlock().run();
        break;
      case "orderedList":
        editor?.chain().focus().toggleOrderedList().run();
        break;
      case "bulletList":
        editor?.chain().focus().toggleBulletList().run();
        break;
      case "left":
        editor?.chain().focus().setTextAlign("left").run();
        break;
      case "center":
        editor?.chain().focus().setTextAlign("center").run();
        break;
      case "right":
        editor?.chain().focus().setTextAlign("right").run();
    }
  };
  return (
    <div className={"flex w-full flex-wrap gap-2"}>
      {tools.map((tool) => {
        return (
          <ToolButton
            active={
              editor?.isActive(tool.name) ??
              editor?.isActive({ textAlign: tool.name })
            }
            onClick={() => handleToolClick(tool.name)}
            key={tool.name}
          >
            {tool.icon}
          </ToolButton>
        );
      })}
    </div>
  );
};

export default Tools;
