import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
const SettingsPanel = (props: {
  isOpen: Boolean;
  pitch: number;
  speed: number;
  voice: SpeechSynthesisVoice | null;
  setIsOpen: Function;
  setPitch: Function;
  setSpeed: Function;
  setVoice: Function;
}) => {
  const [text, setText] = useState("Hello, I am a text to speech engine");

  const voices = window.speechSynthesis.getVoices();
  const speakString = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = props.voice;
    utterance.pitch = props.pitch;
    utterance.rate = props.speed;
    window.speechSynthesis.speak(utterance);
  };
  return (
    <>
      {props.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-accent p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl mb-4">Settings</h2>
            <div className="flex gap-1">
              <div className="w-full">
                <Textarea
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  value={text}
                  className="h-full my-1"
                  placeholder="Write..."
                />
              </div>
              <div className="w-full">
                <div className="mb-4">
                  <label className="block mb-2">Pitch</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={props.pitch}
                    onChange={(e) => props.setPitch(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Speed</label>
                  <input
                    type="range"
                    min="0.3"
                    max="3"
                    step="0.1"
                    value={props.speed}
                    onChange={(e) => props.setSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Speaker</label>
                  <select
                    value={props.voice?.name}
                    onChange={(e) =>
                      props.setVoice(
                        voices.find((v) => v.name === e.target.value) || null
                      )
                    }
                    className="bg-accent w-full p-2 border border-border rounded"
                  >
                    {voices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex justify-around w-full">
                <Button className="mt-5" onClick={() => props.setIsOpen(false)}>
                  Close
                </Button>
                <div className="w-full"></div>
                <Button className="mt-5" onClick={speakString}>
                  Test
                </Button>
              </div>
              <div className="w-full"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;
