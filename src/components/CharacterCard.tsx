
import { Shield, Sword, Brain, Zap, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
  name: string;
  type: string;
  health: number;
  strength: number;
  defense: number;
  intelligence: number;
  speed: number;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
  delay?: number;
}

const CharacterCard = ({
  name,
  type,
  health,
  strength,
  defense,
  intelligence,
  speed,
  icon,
  selected = false,
  onClick,
  delay = 0,
}: CharacterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={cn(
        "character-card relative flex flex-col glass rounded-lg overflow-hidden cursor-pointer",
        selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "",
      )}
      onClick={onClick}
    >
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl"></div>
      
      <div className="p-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
          <img src={icon} alt={name} className="w-20 h-20 object-contain" />
        </div>
        
        <h3 className="text-xl font-bold text-center mb-1">{name}</h3>
        <div className="text-sm text-muted-foreground text-center mb-4 inline-block px-3 py-1 bg-secondary/50 rounded-full mx-auto">
          {type}
        </div>
        
        <div className="grid grid-cols-5 gap-2 mt-4">
          <div className="flex flex-col items-center" title="Health">
            <Heart size={18} className="text-red-500 mb-1" />
            <span className="text-sm">{health}</span>
          </div>
          <div className="flex flex-col items-center" title="Strength">
            <Sword size={18} className="text-red-400 mb-1" />
            <span className="text-sm">{strength}</span>
          </div>
          <div className="flex flex-col items-center" title="Defense">
            <Shield size={18} className="text-blue-400 mb-1" />
            <span className="text-sm">{defense}</span>
          </div>
          <div className="flex flex-col items-center" title="Intelligence">
            <Brain size={18} className="text-purple-400 mb-1" />
            <span className="text-sm">{intelligence}</span>
          </div>
          <div className="flex flex-col items-center" title="Speed">
            <Zap size={18} className="text-yellow-400 mb-1" />
            <span className="text-sm">{speed}</span>
          </div>
        </div>
      </div>
      
      {selected && (
        <div className="absolute inset-0 bg-primary/10 pointer-events-none border border-primary/40"></div>
      )}
    </motion.div>
  );
};

export default CharacterCard;
