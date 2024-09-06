import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Nav() {
  return (
    <nav className="p-4 flex px-40">
      <h1 className="text-3xl">SpellWave</h1>
      <div className="w-full"></div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>USER</AvatarFallback>
      </Avatar>
    </nav>
  );
}
