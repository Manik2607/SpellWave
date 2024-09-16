import Input from "./input";
import Settings from "./settings";
import { useEffect, useState, useRef } from "react";

import Confetti from "react-confetti";
import { Toaster } from "./ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function Main() {
  const { toast } = useToast();

  const [word, setWord] = useState(""); // The random word from the backend
  const [inputWord, setInputWord] = useState(""); // User's input
  const [result, setResult] = useState(false);

  const [wrongCounter, setwrongCounter] = useState(1);
  const [wrong, setWrong] = useState(false);

  //speach settings
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  //functions

  //show a card with meaning of the word using dictonary api
  const onMeaningPressed = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (
        data &&
        data.length > 0 &&
        data[0].meanings &&
        data[0].meanings.length > 0
      ) {
        toast({
          title: word,
          description: data[0].meanings[0].definitions[0].definition,
        });
        console.log(data[0].meanings[0].definitions[0].definition);
      } else {
        console.log("No definition found");
      }
    } catch (error) {
      console.error("Error fetching the word meaning:", error);
      console.log("Error fetching the word meaning");
    }
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
    //randome no between 3 and 8
    const no = Math.floor(Math.random() * 5) + 4;
    var url = `https://api.datamuse.com/words?sp=`;
    for (let i = 0; i < no; i++) {
      url += "?";
    }
    setInputWord("");
    const response = await fetch(url);
    const data = await response.json();
    const index = Math.floor(Math.random() * data.length);
    setWord(data[index].word);
    console.log(data[index].word);
    speakString(data[index].word);
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
    }else if(currentlyPressedKeys[" "]){
      onMeaningPressed();
    }
  }, [currentlyPressedKeys]);

  return (
    <>
      {false && <Confetti numberOfPieces={500} width={width} height={height} />}
      <Toaster />
      <Settings
        voice={voice}
        speed={speed}
        pitch={pitch}
        setPitch={setPitch}
        setSpeed={setSpeed}
        setVoice={setVoice}
        next={fetchRandomWord}
        speak={speakWord}
        meaning={onMeaningPressed}
      />
      <div className="w-full h-full ">
        <div className="flex justify-center flex-col">
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
