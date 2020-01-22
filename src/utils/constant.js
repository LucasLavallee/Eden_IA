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
    YEAR_TIME: 500
  },
  DEFAULT_GENOME: {
    CAROT: {
      color: '#ff6600',
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
      size: 2,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    },
    PEAR: {
      color: '#DADC35',
      size: 2,
      temperature: [5, 25],
      pollution: 60,
      brightness: [20, 70],
      humidity: [10, 40],
      lifeTime: [180, 220],
      reproductionRate: [100, 120]
    }
  },

  DEFAULT_BUSH_GENOME: {
    PEAR_TREE: {
      lifeTime: [80, 120], // year / cycle
      nbFlowers: [15, 30],
      size: 1.0,
      temperature: [5, 25],
      pollution: 30,
      brightness: [20, 70],
      humidity: [10, 40]
    }
  },

  BUSHES_DATA: {
    PEAR_TREE: {
      startingCycle: 0.2,
      flowerTimeFactor: 0.2,
      fruitTimeFactor: 0.3
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
