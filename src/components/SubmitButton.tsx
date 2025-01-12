import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  className?: string;
  loading: boolean;
  disabled: boolean;
  text: string;
};

const SubmitButton = ({
  text,
  loading,
  disabled,
  className,
}: SubmitButtonProps) => {
  return (
    <Button className={cn(className)} disabled={disabled} type={"submit"}>
      {loading ? (
        <p className={"flex items-center justify-center gap-3"}>
          <Loader2 className={"size-4 animate-spin"} /> please wait...
        </p>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
