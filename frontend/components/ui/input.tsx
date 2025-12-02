import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
        ref={ref}
        className={cn(
            "w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none",
            className
        )}
        {...props}
        />
    );
    }
);

Input.displayName = "Input";
