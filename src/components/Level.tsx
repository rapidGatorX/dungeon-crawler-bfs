import React from 'react';
import Chamber from './Chamber';
import { cn } from "@/lib/utils";

interface LevelProps {
  level: number;
  chambers: boolean[];
  currentChamber: number | null;
  onChamberClick: (chamber: number) => void;
  completed: boolean;
}

const Level = ({ level, chambers, currentChamber, onChamberClick, completed }: LevelProps) => {
  return (
    <div className={cn(
      "flex flex-col gap-4 p-4 rounded-xl transition-all duration-500",
      "bg-dungeon-primary/20 backdrop-blur-sm",
      completed && "bg-dungeon-visited/20 scale-[0.98] opacity-75"
    )}>
      <h3 className="text-xl font-bold text-dungeon-accent">Level {level}</h3>
      <div className={cn(
        "grid gap-2",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
        "justify-items-center"
      )}>
        {chambers.map((visited, idx) => (
          <Chamber
            key={idx}
            number={idx + 1}
            visited={visited}
            current={currentChamber === idx}
            onClick={() => onChamberClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Level;