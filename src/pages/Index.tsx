
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameHeader from "@/components/GameHeader";
import CharacterSelection from "@/components/CharacterSelection";
import BattleArena from "@/components/BattleArena";
import GameOverScreen from "@/components/GameOverScreen";
import { characters, enemy } from "@/data/characters";
import { useToast } from "@/components/ui/use-toast";

enum GameState {
  CHARACTER_SELECTION,
  BATTLE,
  GAME_OVER
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.CHARACTER_SELECTION);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [battleResult, setBattleResult] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    toast({
      title: `${character.name} selected!`,
      description: `You've chosen the ${character.type} class. Prepare for battle!`,
    });
    setGameState(GameState.BATTLE);
  };

  const handleBattleEnd = (victory: boolean) => {
    setBattleResult(victory);
    setGameState(GameState.GAME_OVER);
  };

  const handlePlayAgain = () => {
    setGameState(GameState.CHARACTER_SELECTION);
    setSelectedCharacter(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-background to-background/90 p-4 sm:p-6 md:p-8"
    >
      <div className="container mx-auto py-6">
        <GameHeader title="Fantasy Battle Arena" />
        
        <AnimatePresence mode="wait">
          {gameState === GameState.CHARACTER_SELECTION && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CharacterSelection 
                characters={characters} 
                onSelectCharacter={handleSelectCharacter} 
              />
            </motion.div>
          )}
          
          {gameState === GameState.BATTLE && selectedCharacter && (
            <motion.div
              key="battle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BattleArena 
                player={selectedCharacter} 
                enemy={enemy} 
                onBattleEnd={handleBattleEnd} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {gameState === GameState.GAME_OVER && selectedCharacter && (
          <GameOverScreen 
            victory={battleResult} 
            character={{ 
              name: selectedCharacter.name, 
              icon: selectedCharacter.icon 
            }}
            enemy={{ 
              name: enemy.name, 
              icon: enemy.icon 
            }}
            onPlayAgain={handlePlayAgain} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default Index;
