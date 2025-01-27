import { cn } from "@/lib/utils";

type TextAnimatedGradientProps = {
  text: string;
  className?: string;
};

const TextAnimatedGradient = ({
  text,
  className,
}: TextAnimatedGradientProps) => {
  return (
    <span
      className={cn(
        "animate-text-gradient inline-flex bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent",
        className,
      )}
    >
      {text}
    </span>
  );
};

export default TextAnimatedGradient;
