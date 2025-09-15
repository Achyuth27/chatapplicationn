import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="bg-primary rounded-md p-2">
        <MessageSquare className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">WhisperNet</h1>
    </div>
  );
}
