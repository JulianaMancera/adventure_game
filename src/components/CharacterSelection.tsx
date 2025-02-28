
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CharacterCard from "./CharacterCard";
import { ArrowRight } from "lucide-react";

interface Character {
  id: string;
  name: string;
  type: string;
  health: number;
  maxHealth: number;
  strength: number;
  defense: number;
  intelligence: number;
  speed: number;
  icon: string;
  abilities: Ability[];
  cooldowns: { [key: string]: number };
}

interface Ability {
  id: number;
  name: string;
  damage: number;
  cooldown: number;
  currentCooldown: number;
  icon: string;
}

interface CharacterSelectionProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}

const CharacterSelection = ({ characters, onSelectCharacter }: CharacterSelectionProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const handleSelectCharacter = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  const handleConfirm = () => {
    if (selectedCharacter) {
      const character = characters.find(c => c.id === selectedCharacter);
      if (character) {
        onSelectCharacter(character);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="glass rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Character</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.id}
              name={character.name}
              type={character.type}
              health={character.health}
              strength={character.strength}
              defense={character.defense}
              intelligence={character.intelligence}
              speed={character.speed}
              icon={character.icon}
              selected={selectedCharacter === character.id}
              onClick={() => handleSelectCharacter(character.id)}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleConfirm}
            disabled={!selectedCharacter}
            size="lg"
            className="animate-button-glow"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterSelection;
