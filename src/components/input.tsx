import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_CHARS } from "input-otp";

export default function Input(props: { maxLength: number }) {
  return (
    <>
      <div className="px-2 py-1 flex justify-around h-full ">
        <InputOTP maxLength={props.maxLength} pattern={REGEXP_ONLY_CHARS}>
          <InputOTPGroup>
            {Array.from({ length: props.maxLength }, (_, index) => (
              <InputOTPSlot index={index} key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </>
  );
}
