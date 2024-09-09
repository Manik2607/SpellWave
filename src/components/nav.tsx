import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Nav() {
  return (
    <nav className="p-6 mb-2 flex px-40">
      {/* make this h1 like a logo style */}
      <h1 className="text-3xl font-bold text-white">SpellWave</h1>
      <div className="w-full"></div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>USER</AvatarFallback>
      </Avatar>
    </nav>
  );
}
