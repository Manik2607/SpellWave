import { createContext, useContext } from "react";

// Define the context type
interface SettingsContextType {
  voice: SpeechSynthesisVoice | null;
  speed: number;
  pitch: number;
  difficulty: string;
  numOfChar: number;
  setPitch: React.Dispatch<React.SetStateAction<number>>;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setNumOfChar: React.Dispatch<React.SetStateAction<number>>;
  setVoice: React.Dispatch<React.SetStateAction<SpeechSynthesisVoice | null>>;
  fetchRandomWord: Function;
  speakWord: Function;
  onMeaningPressed: Function;
}

// Create the context
const SettingsContext = createContext<SettingsContextType | null>(null);

// Export the useContext hook for easier access
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider"
    );
  }
  return context;
};

export default SettingsContext;
