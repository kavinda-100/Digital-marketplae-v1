import { Ban } from "lucide-react";

const RedirectPage = () => {
  return (
    <section
      className={
        "container mx-auto flex h-auto items-center justify-center p-2"
      }
    >
      <div className={"flex flex-col gap-5 px-4 py-3"}>
        <p
          className={
            "flex gap-3 text-center text-sm font-semibold text-muted-foreground"
          }
        >
          <Ban className={"size-4 text-red-600"} /> Please login to view this
          page
        </p>
      </div>
    </section>
  );
};
export default RedirectPage;
