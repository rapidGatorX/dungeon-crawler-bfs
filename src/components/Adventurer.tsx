import React from 'react';
import { User } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AdventurerProps {
  jumping: boolean;
  returning: boolean;
}

const Adventurer = ({ jumping, returning }: AdventurerProps) => {
  return (
    <div className={cn(
      "fixed bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-300",
      jumping && "animate-jump",
      returning && "animate-return-to-top"
    )}>
      <User className="w-8 h-8 text-dungeon-accent animate-pulse" />
      <div className="text-xs font-bold text-white">Adventurer X</div>
    </div>
  );
};

export default Adventurer;