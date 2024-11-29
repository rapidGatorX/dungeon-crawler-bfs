import React, { useState, useEffect } from 'react';
import Level from '../components/Level';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const [levels, setLevels] = useState<boolean[][]>(
    Array(10).fill(null).map((_, i) => Array(i + 1).fill(false))
  );
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentChamber, setCurrentChamber] = useState<number | null>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<boolean[]>(Array(10).fill(false));

  const handleChamberClick = (chamber: number) => {
    if (isJumping || isReturning) return;
    
    // Only allow clicking the next unvisited chamber from left to right
    const currentLevelChambers = levels[currentLevel];
    const nextUnvisitedIndex = currentLevelChambers.findIndex(visited => !visited);
    
    if (chamber !== nextUnvisitedIndex) {
      toast({
        title: "Invalid Move",
        description: "You must visit chambers from left to right!",
        variant: "destructive"
      });
      return;
    }
    
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
          setCurrentChamber(null);
        } else {
          setIsReturning(true);
          setTimeout(() => {
            resetGame();
            toast({
              title: "Congratulations!",
              description: "You've completed all levels! Starting over...",
            });
          }, 2000);
        }
      }
    }, 500);
  };

  const resetGame = () => {
    setLevels(Array(10).fill(null).map((_, i) => Array(i + 1).fill(false)));
    setCompletedLevels(Array(10).fill(false));
    setCurrentLevel(0);
    setCurrentChamber(null);
    setIsReturning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-primary to-dungeon-chamber p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-dungeon-accent">
            Dungeon Crawler
          </h1>
          <Button
            onClick={resetGame}
            variant="outline"
            className="bg-dungeon-chamber text-dungeon-accent hover:bg-dungeon-primary"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Game
          </Button>
        </div>
        
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
      </div>
    </div>
  );
};

export default Index;