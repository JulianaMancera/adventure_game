
// Character and ability icons
const icons = {
  swordsman: '/lovable-uploads/267687c8-67d8-46e4-9c2c-1dba43a63cb0.png',
  archer: '/lovable-uploads/55904bea-c1cf-4b9e-a0ac-463d65094f95.png',
  mage: '/lovable-uploads/033d9659-40d5-4e52-84d1-94dc28212b95.png',
  overlord: '/lovable-uploads/f55094cf-599b-4284-961f-112113fec7f7.png',
  enemy: '/lovable-uploads/b80f4b4b-ea1b-4524-8089-df5f52bc761c.png',
  slash: '/lovable-uploads/86ea8ffd-007a-48af-aa7a-1284b3881443.png',
  arrow: '/lovable-uploads/15d99ac8-b68b-40ed-b639-a9c71740f368.png',
  fireball: '/lovable-uploads/857b04a0-e173-4dec-a817-2cd4959bc7af.png',
  superAbility: '/lovable-uploads/b0dc69cd-bfed-4549-a4b5-bcf4dafc5076.png',
};

export const characters = [
  {
    id: "swordsman",
    name: "Razeal",
    type: "Swordsman",
    health: 300,
    maxHealth: 300,
    strength: 30,
    defense: 50,
    intelligence: 30,
    speed: 20,
    icon: icons.swordsman,
    abilities: [
      {
        id: 1,
        name: "Slash",
        damage: 30,
        cooldown: 1,
        currentCooldown: 0,
        icon: icons.slash
      },
      {
        id: 2,
        name: "Double Strike",
        damage: 45,
        cooldown: 2,
        currentCooldown: 0,
        icon: icons.slash
      },
      {
        id: 3,
        name: "Power Slash",
        damage: 60,
        cooldown: 3,
        currentCooldown: 0,
        icon: icons.slash
      },
      {
        id: 4,
        name: "Whirlwind",
        damage: 75,
        cooldown: 4,
        currentCooldown: 0,
        icon: icons.slash
      }
    ],
    cooldowns: {
      slashCooldown: 0
    }
  },
  {
    id: "archer",
    name: "Orion",
    type: "Archer",
    health: 300,
    maxHealth: 300,
    strength: 20,
    defense: 30,
    intelligence: 20,
    speed: 50,
    icon: icons.archer,
    abilities: [
      {
        id: 1,
        name: "Super Arrow",
        damage: 30,
        cooldown: 3,
        currentCooldown: 0,
        icon: icons.arrow
      },
      {
        id: 2,
        name: "Piercing Shot",
        damage: 25,
        cooldown: 2,
        currentCooldown: 0,
        icon: icons.arrow
      },
      {
        id: 3,
        name: "Rapid Fire",
        damage: 45,
        cooldown: 3,
        currentCooldown: 0,
        icon: icons.arrow
      },
      {
        id: 4,
        name: "Sniper Shot",
        damage: 70,
        cooldown: 4,
        currentCooldown: 0,
        icon: icons.arrow
      }
    ],
    cooldowns: {
      arrowCooldown: 3
    }
  },
  {
    id: "mage",
    name: "Holmes",
    type: "Mage",
    health: 300,
    maxHealth: 300,
    strength: 20,
    defense: 20,
    intelligence: 50,
    speed: 25,
    icon: icons.mage,
    abilities: [
      {
        id: 1,
        name: "Fireball",
        damage: 35,
        cooldown: 2,
        currentCooldown: 0,
        icon: icons.fireball
      },
      {
        id: 2,
        name: "Frost Nova",
        damage: 30,
        cooldown: 2,
        currentCooldown: 0,
        icon: icons.fireball
      },
      {
        id: 3,
        name: "Lightning Bolt",
        damage: 50,
        cooldown: 3,
        currentCooldown: 0,
        icon: icons.fireball
      },
      {
        id: 4,
        name: "Arcane Blast",
        damage: 65,
        cooldown: 4,
        currentCooldown: 0,
        icon: icons.fireball
      }
    ],
    cooldowns: {
      fireballCooldown: 2
    }
  },
  {
    id: "overlord",
    name: "Lich",
    type: "Overlord",
    health: 300,
    maxHealth: 300,
    strength: 75,
    defense: 55,
    intelligence: 150,
    speed: 250,
    icon: icons.overlord,
    abilities: [
      {
        id: 1,
        name: "Slash",
        damage: 45,
        cooldown: 0,
        currentCooldown: 0,
        icon: icons.slash
      },
      {
        id: 2,
        name: "Super Arrow",
        damage: 45,
        cooldown: 0,
        currentCooldown: 0,
        icon: icons.arrow
      },
      {
        id: 3,
        name: "Fireball",
        damage: 45,
        cooldown: 0,
        currentCooldown: 0,
        icon: icons.fireball
      },
      {
        id: 4,
        name: "Ultimate Power",
        damage: 100,
        cooldown: 5,
        currentCooldown: 0,
        icon: icons.superAbility
      }
    ],
    cooldowns: {
      fireballCooldown: 0,
      arrowCooldown: 0,
      slashCooldown: 0
    }
  }
];

export const enemy = {
  id: "enemy",
  name: "Roscaht",
  type: "Demon",
  health: 75,
  maxHealth: 75,
  strength: 100,
  defense: 5,
  intelligence: 50,
  speed: 50,
  icon: icons.enemy,
  abilities: [
    {
      id: 1,
      name: "Demon Slash",
      damage: 25,
      cooldown: 1,
      currentCooldown: 0,
      icon: icons.slash
    },
    {
      id: 2,
      name: "Dark Orb",
      damage: 35,
      cooldown: 2,
      currentCooldown: 0,
      icon: icons.fireball
    }
  ],
  cooldowns: {}
};
