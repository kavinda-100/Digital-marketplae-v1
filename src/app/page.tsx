import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/ModeToggle";

export default function HomePage() {
  return (
    <section className={"bg-green-500"}>
      <Button>Click me</Button>
      <ModeToggle />
    </section>
  );
}
