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
}) {
  return (
    <>
      <InputOTP
        spellCheck = {false}
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
              className=" text-3xl uppercase  rounded-none min-h-12 min-w-12"
            ></InputOTPSlot>
          ))}
        </InputOTPGroup>
      </InputOTP>
    </>
  );
}
