import React, { useState, useEffect } from 'react';
import Level from '../components/Level';
import Adventurer from '../components/Adventurer';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [levels, setLevels] = useState<boolean[][]>(
    Array(10).fill(null).map((_, i) => Array((i + 1) * (i + 1)).fill(false))
  );
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentChamber, setCurrentChamber] = useState<number | null>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<boolean[]>(Array(10).fill(false));

  const handleChamberClick = (chamber: number) => {
    if (isJumping || isReturning) return;
    
    const newLevels = [...levels];
    newLevels[currentLevel][chamber] = true;
    setLevels(newLevels);
    
    setIsJumping(true);
    setCurrentChamber(chamber);
    
    setTimeout(() => {
      setIsJumping(false);
      
      // Check if level is complete
      if (newLevels[currentLevel].every(chamber => chamber)) {
        const newCompletedLevels = [...completedLevels];
        newCompletedLevels[currentLevel] = true;
        setCompletedLevels(newCompletedLevels);
        
        toast({
          title: "Level Complete!",
          description: `You've cleared level ${currentLevel + 1}!`,
        });
        
        // Move to next level or return to top
        if (currentLevel < 9) {
          setCurrentLevel(prev => prev + 1);
        } else {
          setIsReturning(true);
          setTimeout(() => {
            setCurrentLevel(0);
            setIsReturning(false);
            toast({
              title: "Congratulations!",
              description: "You've completed all levels! Starting over...",
            });
          }, 2000);
        }
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-primary to-dungeon-chamber p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8 relative">
        <h1 className="text-4xl font-bold text-center text-dungeon-accent mb-8">
          Dungeon Crawler
        </h1>
        
        {levels.map((chambers, idx) => (
          <Level
            key={idx}
            level={idx + 1}
            chambers={chambers}
            currentChamber={idx === currentLevel ? currentChamber : null}
            onChamberClick={handleChamberClick}
            completed={completedLevels[idx]}
          />
        ))}
        
        <Adventurer
          jumping={isJumping}
          returning={isReturning}
        />
      </div>
    </div>
  );
};

export default Index;