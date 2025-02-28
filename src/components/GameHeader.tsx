
import { Shield, Sword, Brain, Zap, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface GameHeaderProps {
  title: string;
}

const GameHeader = ({ title }: GameHeaderProps) => {
  return (
    <motion.div 
      className="relative w-full mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg blur-xl opacity-50"></div>
      <div className="relative glass rounded-lg p-6 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {title}
          </span>
        </h1>
        <div className="flex justify-center items-center gap-3 pt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Shield size={16} className="text-blue-400" />
            <span>Defense</span>
          </div>
          <div className="h-4 w-px bg-muted-foreground/30"></div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Sword size={16} className="text-red-400" />
            <span>Strength</span>
          </div>
          <div className="h-4 w-px bg-muted-foreground/30"></div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Brain size={16} className="text-purple-400" />
            <span>Intelligence</span>
          </div>
          <div className="h-4 w-px bg-muted-foreground/30"></div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Zap size={16} className="text-yellow-400" />
            <span>Speed</span>
          </div>
          <div className="h-4 w-px bg-muted-foreground/30"></div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Heart size={16} className="text-red-500" />
            <span>Health</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameHeader;
