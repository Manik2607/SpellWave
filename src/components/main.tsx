import Input from "./input";
import Settings from "./settings";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import Confetti from "react-confetti";

export default function Main() {
  const [word, setWord] = useState(""); // The random word from the backend
  const [inputWord, setInputWord] = useState(""); // User's input
  const [result, setResult] = useState(false);

  const [wrongCounter, setwrongCounter] = useState(0);

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
      }, 3000);
    }
  }, [result]);

  useEffect(() => {
    CheckSpell();
  }, [inputWord]);
  const fetchRandomWord = async () => {
    const response = await fetch("https://api.datamuse.com/words?sp=???????");
    const data = await response.json();
    const index = Math.floor(Math.random() * data.length);
    setWord(data[index].word);
    console.log(data[index].word);
    speakWord(data[index].word);
  };
  const speakWord = (wordToSpeak: string) => {
    const utterance = new SpeechSynthesisUtterance(wordToSpeak);
    window.speechSynthesis.speak(utterance);
  };



  const CheckSpell = () => {
    if(word.length === inputWord.length){
        if (word === inputWord) {
            setResult(true);
            setwrongCounter(0);
        }else{
            setwrongCounter(wrongCounter + 1);
            console.log(wrongCounter);
        }
    }
};
    useEffect(()=>{
    if (wrongCounter > 3) {
        setTimeout(() => {
            setwrongCounter(0);

        },3000);
    }
  },[wrongCounter])
  return (
    <>
      {result && <Confetti width={width} height={height} />}

      <Settings />
      <Button onClick={fetchRandomWord}>Next</Button>
      <Button onClick={() =>{ speakWord(word)}}>Speak</Button>
      <div className="px-2 py-1 flex justify-center flex-col w-full h-full ">
        <div className="flex justify-center">
          <Input
            maxLength={word.length}
            word={inputWord}
            setWord={setInputWord}
          />
        </div>

        {wrongCounter > 3 && (
          <h1 className="text-center text-red-900 text-xl ">{word}</h1>
        )}
      </div>

      {/* <Button onClick={CheckSpell}>Check Spell</Button> */}
    </>
  );
}
