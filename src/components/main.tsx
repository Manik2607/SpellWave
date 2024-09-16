import Input from "./input";
import Settings from "./settings";
import { useEffect, useState } from "react";

import Confetti from "react-confetti";

export default function Main() {
  const [word, setWord] = useState(""); // The random word from the backend
  const [inputWord, setInputWord] = useState(""); // User's input
  const [result, setResult] = useState(false);

  const [wrongCounter, setwrongCounter] = useState(1);
  const [wrong, setWrong] = useState(false);

  //speach settings
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

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

  return (
    <>
      {false && <Confetti numberOfPieces={500} width={width} height={height} />}

      <Settings
        voice={voice}
        speed={speed}
        pitch={pitch}
        setPitch={setPitch}
        setSpeed={setSpeed}
        setVoice={setVoice}
        next={fetchRandomWord}
        speak={speakWord}
      />
      <div className="px-2 py-1 flex justify-center flex-col w-full h-full ">
        <div className="flex justify-center">
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

      {/* <Button onClick={CheckSpell}>Check Spell</Button> */}
    </>
  );
}
