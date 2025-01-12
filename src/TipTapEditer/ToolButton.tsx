import { Button } from "@/components/ui/button";
import React from "react";

type ToolButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
};
const ToolButton = ({ children, onClick, active }: ToolButtonProps) => {
  return (
    <Button
      size={"icon"}
      variant={active ? "default" : "secondary"}
      onClick={onClick}
      type={"button"}
    >
      {children}
    </Button>
  );
};

export default ToolButton;
