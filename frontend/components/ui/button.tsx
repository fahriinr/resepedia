import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost";
}

export function Button({variant = "default", className, ...props}: ButtonProps) {
    return (
    <button
        className={cn(
        "px-4 py-2 rounded-lg font-medium transition",
        variant === "default" && "bg-green-300 hover:bg-green-400 text-sm font-medium",
        variant === "outline" &&
            "border border-gray-300 hover:bg-gray-100",
        variant === "ghost" && "hover:bg-gray-100",
        className
    )}
    {...props}
    />
    );
}
