import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ui/mode-togel";

export default function Nav() {
  return (
    <nav className="p-6 mb-2 flex px-40">
      {/* make this h1 like a logo style */}
      <h1 className="text-3xl font-bold">SpellWave</h1>
      <div className="w-full"></div>
      <ModeToggle/>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>USER</AvatarFallback>
      </Avatar>
    </nav>
  );
}
