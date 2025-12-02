import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "green";
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
    return (
    <span
        className={cn(
        "px-3 py-1 rounded-full text-sm",
        variant === "default" && "bg-gray-200 text-gray-700",
        variant === "green" && "bg-green-100 text-green-700",
        className
        )}
        {...props}
    />
    );
}
