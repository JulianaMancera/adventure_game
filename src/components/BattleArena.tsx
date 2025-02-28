
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sword, Brain, Zap, Heart, SkullIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface Character {
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

interface BattleArenaProps {
  player: Character;
  enemy: Character;
  onBattleEnd: (victory: boolean) => void;
}

const BattleArena = ({ player, enemy: initialEnemy, onBattleEnd }: BattleArenaProps) => {
  const [playerCharacter, setPlayerCharacter] = useState<Character>(player);
  const [enemyCharacter, setEnemyCharacter] = useState<Character>(initialEnemy);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [turn, setTurn] = useState<"player" | "enemy">("player");
  const [battleOver, setBattleOver] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState<number | null>(null);
  const [damageAnimation, setDamageAnimation] = useState<"player" | "enemy" | null>(null);

  useEffect(() => {
    // Add initial battle message
    setBattleLog([`Battle begins! ${player.name} vs ${initialEnemy.name}`]);
  }, [player.name, initialEnemy.name]);

  const addLogMessage = (message: string) => {
    setBattleLog((prev) => [...prev, message]);
  };

  const calculateDamage = (attacker: Character, defender: Character, abilityDamage: number) => {
    const baseDamage = attacker.strength + abilityDamage;
    const damageReduction = defender.defense;
    const finalDamage = Math.max(1, baseDamage - damageReduction);
    return finalDamage;
  };

  const handleAbilityUse = (abilityId: number) => {
    if (turn !== "player" || battleOver) return;
    
    const ability = playerCharacter.abilities.find(a => a.id === abilityId);
    if (!ability) return;
    
    if (ability.currentCooldown > 0) {
      toast({
        title: "Ability on cooldown",
        description: `${ability.name} is still on cooldown for ${ability.currentCooldown} turn(s).`,
        variant: "destructive"
      });
      return;
    }

    setSelectedAbility(abilityId);
    
    // Calculate damage
    const damage = calculateDamage(playerCharacter, enemyCharacter, ability.damage);
    
    // Update cooldown
    const updatedAbilities = playerCharacter.abilities.map(a => 
      a.id === abilityId ? { ...a, currentCooldown: a.cooldown } : a
    );
    
    // Apply damage to enemy
    const updatedEnemyHealth = Math.max(0, enemyCharacter.health - damage);
    
    // Add to battle log
    addLogMessage(`${playerCharacter.name} used ${ability.name} and dealt ${damage} damage to ${enemyCharacter.name}!`);
    
    // Animate damage
    setDamageAnimation("enemy");
    setTimeout(() => setDamageAnimation(null), 600);
    
    // Update state
    setPlayerCharacter({ ...playerCharacter, abilities: updatedAbilities });
    setEnemyCharacter({ ...enemyCharacter, health: updatedEnemyHealth });
    
    // Check if enemy is defeated
    if (updatedEnemyHealth <= 0) {
      addLogMessage(`${enemyCharacter.name} has been defeated! Victory!`);
      setBattleOver(true);
      setTimeout(() => onBattleEnd(true), 1500);
      return;
    }
    
    // Switch to enemy turn
    setTurn("enemy");
    
    // Enemy attacks after a delay
    setTimeout(() => {
      if (battleOver) return;
      
      // Pick random enemy ability
      const enemyAbilities = enemyCharacter.abilities.filter(a => a.currentCooldown === 0);
      
      if (enemyAbilities.length === 0) {
        addLogMessage(`${enemyCharacter.name} has no available abilities and skips their turn.`);
        // Reduce cooldowns for enemy abilities
        const reducedEnemyAbilities = enemyCharacter.abilities.map(a => ({
          ...a,
          currentCooldown: Math.max(0, a.currentCooldown - 1)
        }));
        setEnemyCharacter({ ...enemyCharacter, abilities: reducedEnemyAbilities });
        
        // Reduce player ability cooldowns
        const reducedPlayerAbilities = playerCharacter.abilities.map(a => ({
          ...a,
          currentCooldown: Math.max(0, a.currentCooldown - 1)
        }));
        setPlayerCharacter({ ...playerCharacter, abilities: reducedPlayerAbilities });
        
        setTurn("player");
        return;
      }
      
      const randomAbility = enemyAbilities[Math.floor(Math.random() * enemyAbilities.length)];
      
      // Calculate enemy damage
      const enemyDamage = calculateDamage(enemyCharacter, playerCharacter, randomAbility.damage);
      
      // Update enemy ability cooldowns
      const updatedEnemyAbilities = enemyCharacter.abilities.map(a => 
        a.id === randomAbility.id ? { ...a, currentCooldown: a.cooldown } : a
      );
      
      // Apply damage to player
      const updatedPlayerHealth = Math.max(0, playerCharacter.health - enemyDamage);
      
      // Add to battle log
      addLogMessage(`${enemyCharacter.name} used ${randomAbility.name} and dealt ${enemyDamage} damage to ${playerCharacter.name}!`);
      
      // Animate damage
      setDamageAnimation("player");
      setTimeout(() => setDamageAnimation(null), 600);
      
      // Update state
      setEnemyCharacter({ ...enemyCharacter, abilities: updatedEnemyAbilities });
      setPlayerCharacter({ ...playerCharacter, health: updatedPlayerHealth });
      
      // Check if player is defeated
      if (updatedPlayerHealth <= 0) {
        addLogMessage(`${playerCharacter.name} has been defeated! Game over.`);
        setBattleOver(true);
        setTimeout(() => onBattleEnd(false), 1500);
        return;
      }
      
      // Reduce all cooldowns for next turn
      const reducedEnemyAbilities = updatedEnemyAbilities.map(a => ({
        ...a,
        currentCooldown: Math.max(0, a.currentCooldown - 1)
      }));
      
      const reducedPlayerAbilities = playerCharacter.abilities.map(a => ({
        ...a,
        currentCooldown: Math.max(0, a.currentCooldown - 1)
      }));
      
      setEnemyCharacter({ ...enemyCharacter, abilities: reducedEnemyAbilities });
      setPlayerCharacter({ ...playerCharacter, abilities: reducedPlayerAbilities });
      
      // Back to player turn
      setTurn("player");
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto glass rounded-lg p-6 pb-0 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Player and Enemy characters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative glass p-6 rounded-lg",
            damageAnimation === "player" ? "animate-pulse-gentle bg-destructive/20" : "",
            turn === "player" ? "ring-2 ring-primary/50" : ""
          )}
        >
          {/* Player character */}
          <div className="flex space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                <img src={playerCharacter.icon} alt={playerCharacter.name} className="w-12 h-12" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center">
                {turn === "player" ? "→" : ""}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold">{playerCharacter.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{playerCharacter.type}</p>
              
              <div className="mb-2">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="flex items-center"><Heart size={14} className="text-red-500 mr-1" /> Health</span>
                  <span>{playerCharacter.health}/{playerCharacter.maxHealth}</span>
                </div>
                <Progress 
                  value={(playerCharacter.health / playerCharacter.maxHealth) * 100} 
                  className="h-2 bg-background"
                  indicatorClassName="bg-gradient-to-r from-red-500 to-red-400"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="flex flex-col items-center" title="Strength">
                  <Sword size={16} className="text-red-400 mb-1" />
                  <span className="text-sm">{playerCharacter.strength}</span>
                </div>
                <div className="flex flex-col items-center" title="Defense">
                  <Shield size={16} className="text-blue-400 mb-1" />
                  <span className="text-sm">{playerCharacter.defense}</span>
                </div>
                <div className="flex flex-col items-center" title="Intelligence">
                  <Brain size={16} className="text-purple-400 mb-1" />
                  <span className="text-sm">{playerCharacter.intelligence}</span>
                </div>
                <div className="flex flex-col items-center" title="Speed">
                  <Zap size={16} className="text-yellow-400 mb-1" />
                  <span className="text-sm">{playerCharacter.speed}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative glass p-6 rounded-lg",
            damageAnimation === "enemy" ? "animate-pulse-gentle bg-destructive/20" : "",
            turn === "enemy" ? "ring-2 ring-primary/50" : ""
          )}
        >
          {/* Enemy character */}
          <div className="flex space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full backdrop-blur-sm bg-gradient-to-br from-red-500/10 to-red-500/30 flex items-center justify-center">
                {enemyCharacter.health <= 0 ? (
                  <SkullIcon className="w-12 h-12 text-destructive" />
                ) : (
                  <img src={enemyCharacter.icon} alt={enemyCharacter.name} className="w-12 h-12" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center">
                {turn === "enemy" ? "→" : ""}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold">{enemyCharacter.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{enemyCharacter.type}</p>
              
              <div className="mb-2">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="flex items-center"><Heart size={14} className="text-red-500 mr-1" /> Health</span>
                  <span>{enemyCharacter.health}/{enemyCharacter.maxHealth}</span>
                </div>
                <Progress 
                  value={(enemyCharacter.health / enemyCharacter.maxHealth) * 100} 
                  className="h-2 bg-background"
                  indicatorClassName="bg-gradient-to-r from-red-500 to-red-400"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="flex flex-col items-center" title="Strength">
                  <Sword size={16} className="text-red-400 mb-1" />
                  <span className="text-sm">{enemyCharacter.strength}</span>
                </div>
                <div className="flex flex-col items-center" title="Defense">
                  <Shield size={16} className="text-blue-400 mb-1" />
                  <span className="text-sm">{enemyCharacter.defense}</span>
                </div>
                <div className="flex flex-col items-center" title="Intelligence">
                  <Brain size={16} className="text-purple-400 mb-1" />
                  <span className="text-sm">{enemyCharacter.intelligence}</span>
                </div>
                <div className="flex flex-col items-center" title="Speed">
                  <Zap size={16} className="text-yellow-400 mb-1" />
                  <span className="text-sm">{enemyCharacter.speed}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Abilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass p-6 rounded-lg mb-6"
      >
        <h3 className="text-lg font-bold mb-4">Abilities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {playerCharacter.abilities.map((ability, index) => (
            <Button
              key={ability.id}
              variant={selectedAbility === ability.id ? "default" : "secondary"}
              className={cn(
                "ability-button h-auto py-3 px-4 flex flex-col items-center justify-center gap-2",
                ability.currentCooldown > 0 ? "opacity-50" : "",
                selectedAbility === ability.id ? "border border-primary" : ""
              )}
              disabled={turn !== "player" || ability.currentCooldown > 0 || battleOver}
              onClick={() => handleAbilityUse(ability.id)}
            >
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center mb-1">
                <img src={ability.icon} alt={ability.name} className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{ability.name}</div>
                <div className="text-xs flex items-center justify-center gap-1 mt-1">
                  <Sword size={12} className="text-red-400" />
                  <span>{ability.damage}</span>
                </div>
                {ability.currentCooldown > 0 && (
                  <div className="mt-1 text-xs text-destructive font-medium">
                    Cooldown: {ability.currentCooldown}
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
      
      {/* Battle log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass rounded-lg rounded-b-none p-6 pt-4 h-40 overflow-y-auto"
      >
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Battle Log</h3>
        <div className="space-y-1">
          <AnimatePresence>
            {battleLog.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm border-l-2 border-muted pl-2 py-1"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BattleArena;
