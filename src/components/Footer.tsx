import React from "react";

const Footer = () => {
  return (
    <footer className={"container mx-auto my-3 mb-6 border-t p-2"}>
      <h1 className={"text-lg font-bold text-primary/70 md:text-xl"}>
        Digital <span className={"text-primary"}>Hub</span>
      </h1>
      <div
        className={
          "my-4 flex w-full flex-col items-center justify-center gap-3"
        }
      >
        <div
          className={
            "w-fit rounded-lg border bg-primary/20 px-2 py-1 text-center font-mono font-thin tracking-tight text-primary/60"
          }
        >
          Digital Hub v1.0.0
        </div>
        <p className={"text-center text-sm text-muted-foreground"}>
          Your one-stop shop for all your digital needs. Discover a world of
          online services, from web design and development to digital marketing
          and beyond.
        </p>
        <p className={"text-center text-sm text-muted-foreground"}>
          All rights reserved &copy; {new Date().getFullYear()} Digital Hub
        </p>
      </div>
    </footer>
  );
};

export default Footer;
