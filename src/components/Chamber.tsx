import React from 'react';
import { cn } from "@/lib/utils";
import { User } from 'lucide-react';

interface ChamberProps {
  number: number;
  visited: boolean;
  current: boolean;
  onClick: () => void;
}

const Chamber = ({ number, visited, current, onClick }: ChamberProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-16 h-16 rounded-lg cursor-pointer transition-all duration-300",
        "border-2 flex items-center justify-center text-white font-bold",
        visited ? "bg-dungeon-visited border-dungeon-accent" : "bg-dungeon-chamber border-dungeon-primary",
        current && "animate-glow",
        "hover:scale-105"
      )}
    >
      {current ? (
        <User className="w-6 h-6 text-dungeon-accent animate-pulse" />
      ) : (
        number
      )}
      {visited && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-dungeon-accent rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default Chamber;