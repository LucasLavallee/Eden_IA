export default {
  GROUND: {
    WIDTH: 100,
    SUBDIVISIONS: 16,
    MAX: 1.5 // Variation de hauteur
  },
  REPRODUCTION: {
    DISTANCE: 20
  },
  TIME_INFOS: {
    YEAR_TIME: 100
  },
  DEFAULT_GENOME: {
    BEET: {
      color: '#7F023D',
      size: 0.5,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    CARROT: {
      color: '#FF6600',
      size: 1,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    PEPPER: {
      color: '#FFA700',
      size: 0.5,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    PUMPKIN: {
      color: '#FF8100',
      size: 0.7,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    ZUCCHINI: {
      color: '#356100',
      size: 1,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    BANANA: {
      color: '#EBD647',
      size: 1,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    TOMATO: {
      color: '#AB0000',
      size: 0.3,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    PEAR: {
      color: '#DADC35',
      size: 1,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    STRAWBERRY: {
      color: '#7C0000',
      size: 0.4,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    ORANGE: {
      color: '#FF8B00',
      size: 1,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    }
  },

  DEFAULT_BUSH_GENOME: {
    CARROT_TREE: {
      lifeTime: [3,5], // year / cycle
      nbFlowers: [1,3],
      size: 1.0,
      temperature: [5, 25],
      pollution: 30,
      brightness: [20, 70],
      humidity: [10, 40]
    },
    BEET_TREE: {
      lifeTime: [4,7], // year / cycle
      nbFlowers: [1,3],
      size: 0.8,
      temperature: [5, 25],
      pollution: 50,
      brightness: [20, 30],
      humidity: [60, 80]
    },
    PEAR_TREE: {
      lifeTime: [5,10], // year / cycle
      nbFlowers: [3, 7],
      size: 1.0,
      temperature: [5, 25],
      pollution: 30,
      brightness: [20, 70],
      humidity: [10, 40]
    },
    ORANGE_TREE: {
      lifeTime: [5,10], // year / cycle
      nbFlowers: [5, 7],
      nbLeaves: 3,
      size: 1.0,
      temperature: [20, 40],
      pollution: 20,
      brightness: [20, 70],
      humidity: [10, 40]
    },
    STRAWBERRY_TREE: {
      lifeTime: [5,9], // year / cycle
      nbFlowers: [4,8],
      size: 1.0,
      temperature: [5, 25],
      pollution: 30,
      brightness: [20, 70],
      humidity: [10, 40]
    },
    TOMATO_TREE: {
      lifeTime: [5, 10], // year / cycle
      nbFlowers: [2, 5],
      nbLeaves: 3,
      size: 1.0,
      temperature: [10, 25],
      pollution: 20,
      brightness: [20, 50],
      humidity: [30, 50]
    },
    PEPPER_TREE: {
      lifeTime: [5, 10], // year / cycle
      nbFlowers: [2, 5],
      nbLeaves: 3,
      size: 1.0,
      temperature: [10, 25],
      pollution: 20,
      brightness: [20, 70],
      humidity: [30, 70]
    },
    PUMPKIN_TREE: {
      lifeTime: [5, 10], // year / cycle
      nbFlowers: [2, 5],
      nbLeaves: 3,
      size: 1.0,
      temperature: [60, 70],
      pollution: 20,
      brightness: [60, 70],
      humidity: [60, 70]
    },
    ZUCCHINI_TREE: {
      lifeTime: [5, 10], // year / cycle
      nbFlowers: [2, 5],
      nbLeaves: 3,
      size: 1.0,
      temperature: [10, 25],
      pollution: 20,
      brightness: [50, 70],
      humidity: [50, 70]
    }
  },
  BUSHES_DATA: { 
    CARROT_TREE: {
      startingCycle: 0.4,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.2,
      reproductionDistance: 5,
      maxFlowers: 2,
      maxTree: 25,
      birthChance: 4
    },
    BEET_TREE: {
      startingCycle: 0.5,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.2,
      reproductionDistance: 5,
      maxFlowers: 2,
      maxTree: 25,
      maxLeaves: 5,
      birthChance: 4
    },
    PEAR_TREE: {
      startingCycle: 0.2,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.4,
      reproductionDistance: 10,
      maxFlowers: 25,
      maxTree: 15,
      maxLeaves: 5,
      birthChance: 8
    },
    ORANGE_TREE: {
      startingCycle: 0.3,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.5,
      reproductionDistance: 10,
      maxFlowers: 7,
      maxLeaves: 5,
      maxTree: 10,
      birthChance: 2
    },
    TOMATO_TREE: {
      startingCycle: 0.1,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.4,
      reproductionDistance: 20,
      maxFlowers: 5,
      maxTree: 20,
      maxLeaves: 6,
      birthChance: 3
    },
    STRAWBERRY_TREE: {
      startingCycle: 0.2,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.4,
      reproductionDistance: 20,
      maxFlowers: 8,
      maxTree: 20,
      maxLeaves: 5,
      birthChance: 4
    },
    PEPPER_TREE: {
      startingCycle: 0.4,
      flowerTimeFactor: 0.3,
      fruitTimeFactor: 0.2,
      reproductionDistance: 10,
      maxFlowers: 5,
      maxLeaves: 5,
      maxTree: 20,
      birthChance: 4
    },
    PUMPKIN_TREE: {
      startingCycle: 0.35,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.4,
      reproductionDistance: 20,
      maxFlowers: 6,
      maxLeaves: 6,
      maxTree: 15,
      birthChance: 3
    },
    ZUCCHINI_TREE: {
      startingCycle: 0.25,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.4,
      reproductionDistance: 20,
      maxFlowers: 5,
      maxLeaves: 4,
      maxTree: 15,
      birthChance: 4
    }
  },

  COLOR: {
    BLUE: '#1C7EE8',
    RED: '#FF2C42',
    GREEN: '#027818',
    YELLOW: '#EBD647',
    ORANGE: '#ff6600'
  }
}
