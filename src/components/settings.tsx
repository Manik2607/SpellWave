import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import SettingsPanel from "./settingsPanel";

export default function Settings(props: { next: Function; speak: Function }) {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  
  return (
    <div className="bg-accent px-2 py-1 flex rounded-xl mx-48">
      <SettingsPanel
        isOpen={isSettingsPanelOpen}
        setIsOpen={setIsSettingsPanelOpen}
      />
      <Button
        variant="ghost"
        className="text-gray-400 hover:text-gray-100 my-auto"
        onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
      >
        Settings
      </Button>
      <span className="w-2 h-10 bg-background rounded-lg"></span>

      <Select>
        <SelectTrigger className="w-[180px] my-auto mx-4 text-gray-400 hover:text-gray-100">
          <SelectValue placeholder="Select Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Difficulty</SelectLabel>
            <SelectItem value="very easy">Very easy</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="very hard">Very hard</SelectItem>
          </SelectGroup>
        </SelectContent>

        <div className="w-full"></div>
      </Select>
      
      <Button
        variant="ghost"
        className="text-gray-400 hover:text-gray-100 my-auto"
        onClick={() => {}}
      >
        Meaning
      </Button>
      <Button
        variant="ghost"
        className="text-gray-400 hover:text-gray-100 my-auto"
        onClick={() => {
          props.speak();
        }}
      >
        Speak
      </Button>
      <Button
        variant="ghost"
        className="text-gray-400 hover:text-gray-100 my-auto"
        onClick={() => {
          props.next();
        }}
      >
        Next
      </Button>
      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  );
}
