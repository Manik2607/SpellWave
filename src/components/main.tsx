import Input from "./input";
import Settings from "./settings";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import Confetti from "react-confetti";
import { getRandomValues } from "crypto";
import { url } from "inspector";

export default function Main() {
  const [word, setWord] = useState(""); // The random word from the backend
  const [inputWord, setInputWord] = useState(""); // User's input
  const [result, setResult] = useState(false);

  const [wrongCounter, setwrongCounter] = useState(1);

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
    //randome no between 3 and 8
    const no = Math.floor(Math.random() * 5) + 6;
    var url = `https://api.datamuse.com/words?sp=`;
    for (let i = 0; i < no; i++) {
      url += "?";
    }
    const response = await fetch(url);
    const data = await response.json();
    const index = Math.floor(Math.random() * data.length);
    setWord(data[index].word);
    console.log(data[index].word);
    speakString(data[index].word);
  };
  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    //change the voice
    // console.log(speechSynthesis.getVoices());
    utterance.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(utterance);
  };
  const speakString = (text:string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    //change the voice
    // console.log(speechSynthesis.getVoices());
    utterance.voice = speechSynthesis.getVoices()[2];
    window.speechSynthesis.speak(utterance);
  };



  const CheckSpell = () => {
    if(word.length === inputWord.length){
        if (word === inputWord) {
            setResult(true);
            setwrongCounter(1);
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
      {result && <Confetti numberOfPieces={500} width={width} height={height} />}

      <Settings next={fetchRandomWord} speak={speakWord}/>
      <div className="px-2 py-1 flex justify-center flex-col w-full h-full ">
        <div className="flex justify-center">
          <Input
            maxLength={word.length}
            word={inputWord}
            setWord={setInputWord}
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
