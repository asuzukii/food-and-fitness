import { MouseEventHandler } from "react";
import Image from "next/image";

type ButtonProps = {
  title: string,
  leftIcon?: string | null,
  rightIcon?: string | null,
  handleClick?: MouseEventHandler,
  isSubmitting?: boolean,
  type?: "button" | "submit",
  bgColor?: string,
  textColor?: string
};

const Button = ({ title, leftIcon, rightIcon, handleClick,
  isSubmitting, type, bgColor, textColor }: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      // TODO: add bg and text color later
      className={`
        flexCenter gap-3 px-4 py-3
        ${textColor || "text-white"}
        ${isSubmitting ? "bg-black/50" :
          bgColor || "bg-primary-purple"}
        rounded-xl text-sm font-medium max-md:w-full
      `}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image
          src={leftIcon}
          width={14}
          height={14}
          alt="left"
        />
      )}
      {title}
      {rightIcon && (
        <Image
          src={rightIcon}
          width={14}
          height={14}
          alt="right"
        />
      )}
    </button>

  );
};

export default Button;