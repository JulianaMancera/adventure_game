
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SkullIcon, Trophy, RotateCcw } from "lucide-react";

interface GameOverScreenProps {
  victory: boolean;
  character: {
    name: string;
    icon: string;
  };
  enemy: {
    name: string;
    icon: string;
  };
  onPlayAgain: () => void;
}

const GameOverScreen = ({ victory, character, enemy, onPlayAgain }: GameOverScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-md glass rounded-lg p-8 text-center">
        {victory ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
              <Trophy className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Victory!</h2>
            <p className="text-muted-foreground">
              {character.name} has defeated {enemy.name}!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
              <SkullIcon className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Defeat</h2>
            <p className="text-muted-foreground">
              {character.name} has been defeated by {enemy.name}.
            </p>
          </motion.div>
        )}
        
        <div className="flex justify-center mt-8">
          <Button onClick={onPlayAgain} size="lg" className="animate-button-glow">
            <RotateCcw className="mr-2 h-4 w-4" /> Play Again
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameOverScreen;
