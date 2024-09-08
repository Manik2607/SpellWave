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
          maxLength={props.maxLength}
          pattern={REGEXP_ONLY_CHARS}
          value={props.word}
          onChange={(e) => props.setWord(e)}
        >
          <InputOTPGroup>
            {Array.from({ length: props.maxLength }, (_, index) => (
              <InputOTPSlot index={index} key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
    </>
  );
}
