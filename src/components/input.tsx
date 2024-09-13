import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_CHARS } from "input-otp";


export default function Input(props: {
  maxLength: number;
  word: string;
  setWord: Function;
  wrong:boolean;
  right:boolean;
}) {

  return (
    <>
      <InputOTP
        spellCheck={false}
        maxLength={props.maxLength}
        pattern={REGEXP_ONLY_CHARS}
        value={props.word}
        onChange={(e) => props.setWord(e)}
        className="flex justify-center space-x-2 "
      >
        <InputOTPGroup>
          {Array.from({ length: props.maxLength }, (_, index) => (
            <InputOTPSlot
              index={index}
              key={index}
              className={`${props.wrong ? " border-destructive text-destructive" : ""}
              ${props.right ? " border-green-400 text-green-400" : ""}
               text-3xl uppercase rounded-none min-h-12 min-w-12`}
            ></InputOTPSlot>
          ))}
        </InputOTPGroup>
      </InputOTP>
    </>
  );
}
