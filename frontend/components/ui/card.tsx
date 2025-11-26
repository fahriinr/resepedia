import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
    <div
        className={cn("bg-white shadow-md rounded-xl p-6", className)}
        {...props}
    />
    );
}
