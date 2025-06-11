import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded-xl text-white font-semibold shadow-md transition",
        {
          "bg-blue-600 hover:bg-blue-700": variant === "default",
          "bg-red-600 hover:bg-red-700": variant === "destructive"
        },
        className
      )}
      {...props}
    />
  );
};