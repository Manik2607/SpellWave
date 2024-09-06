import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";

export default function Settings() {
  return (
    <div className="bg-secondary px-2 py-1 flex rounded-xl mx-48 my-5">
      <h2 className="px-5 my-auto">Settings</h2>
      <span className="w-2 h-10 bg-background rounded-lg"></span>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="very easy">Very easy</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="very hard">Very hard</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  );
}
