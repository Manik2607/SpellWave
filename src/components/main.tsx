import Input from "./input";
import Settings from "./settings";
import { useEffect, useState } from "react";

import Confetti from "react-confetti";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/hooks/use-toast";

import SettingsContext from "./SettingsContext";

import { ask } from "@/lib/ai";

export default function Main() {
  const { toast } = useToast();

  const [word, setWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [result, setResult] = useState(false);

  const [wrongCounter, setwrongCounter] = useState(1);
  const [wrong, setWrong] = useState(false);

  //speach settings
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const [difficulty, setDifficulty] = useState("medium");
  const [numOfChar, setNumOfChar] = useState(7);

  //show a card with meaning of the word using dictonary api
  const onMeaningPressed = async () => {
      const format = "format the response as plane text with less than 3 lines,dont write the word, without additional commentary or examples. just meaning.";
      const prompt = `What is the meaning of the word "${word}"? ${format}`;
      
      ask(prompt).then((meaning) => {
        console.log(meaning);
        toast({
          title: word,
          description: meaning,
        });
      })
      .catch((error) => {
        console.error(error);
      });




  };
  const { width, height } =
    typeof window !== "undefined"
      ? { width: window.innerWidth - 10, height: window.innerHeight - 10 }
      : { width: 0, height: 0 };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        setInputWord("");
        setResult(false);
        fetchRandomWord();
      }, 1000);
    }
  }, [result]);

  useEffect(() => {
    CheckSpell();
  }, [inputWord]);
  const fetchRandomWord = async () => {

    setInputWord("");
    const format = "Format the response as plain text, one word per line, without titles, numbers, or additional content.";
    const prompt = `List commonly used, ${difficulty}-difficulty single words that are ${numOfChar} letters long and important for students to spell.`;


    ask(prompt + format)
      .then((res) => {
        //randome index
        var randoneIndex = Math.floor(Math.random() * res.split("\n").length);
        var theWord = res.split("\n")[randoneIndex].toLowerCase().trim();
        setWord(theWord);
        console.log(theWord);
        speakString(theWord);
      })
      .catch((error) => {
        console.error(error);
      });

  };
  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = speed;
    window.speechSynthesis.speak(utterance);
  };
  const speakString = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = speed;
    window.speechSynthesis.speak(utterance);
  };

  const CheckSpell = () => {
    if (word.length === inputWord.length) {
      if (word === inputWord) {
        setResult(true);
        setwrongCounter(1);
      } else {
        setwrongCounter(wrongCounter + 1);
        setWrong(true);
        console.log(wrongCounter);
      }
    } else {
      setWrong(false);
      setResult(false);
    }
  };
  useEffect(() => {
    if (wrongCounter > 3) {
      setTimeout(() => {
        setwrongCounter(0);
      }, 3000);
    }
  }, [wrongCounter]);
  useEffect(() => {
    setTimeout(() => {
      setWrong(false);
    }, 1000);
  }, [wrong]);

  const [currentlyPressedKeys, setCurrentlyPressedKeys] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      setCurrentlyPressedKeys((prevKeys) => ({
        ...prevKeys,
        [event.key]: true,
      }));

      if (event.key === "Escape") {
        console.log("Esc key pressed");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setCurrentlyPressedKeys((prevKeys) => ({
        ...prevKeys,
        [event.key]: false,
      }));
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (currentlyPressedKeys["Enter"]) {
      fetchRandomWord();
    } else if (currentlyPressedKeys["`"]) {
      speakWord();
    } else if (currentlyPressedKeys[" "]) {
      onMeaningPressed();
    }
  }, [currentlyPressedKeys]);

  return (
    <>
      {false && <Confetti numberOfPieces={500} width={width} height={height} />}
      <Toaster />
      <SettingsContext.Provider
        value={{
          voice,
          speed,
          pitch,
          difficulty,
          numOfChar,
          setPitch,
          setSpeed,
          setVoice,
          setDifficulty,
          setNumOfChar,
          fetchRandomWord,
          speakWord,
          onMeaningPressed,
        }}
      >
        <Settings />
      </SettingsContext.Provider>

      <div className="flex flex-col w-full h-full ">
        <div className="flex justify-center flex-col flex-grow">
          <div className="flex flex-col justify-center m-52">
            <div className="m-auto">
              <Input
                maxLength={word.length}
                word={inputWord}
                setWord={setInputWord}
                wrong={wrong}
                right={result}
              />
            </div>

            {wrongCounter > 3 && (
              <h1 className="text-center text-red-800 text-xl ">{word}</h1>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center text-sm font-mono text-gray-500">
          <p className="text-center">Space - Find Meaning</p>
          <p className="text-center">Enter - Skip Word</p>
          <p className="text-center">` - Speak Word</p>
        </div>
      </div>

      {/* <Button onClick={CheckSpell}>Check Spell</Button> */}
    </>
  );
}
