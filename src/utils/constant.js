
export default {
  GROUND: {
    WIDTH: 100,
    SUBDIVISIONS: 16,
    MAX: 1.5 // Variation de hauteur
  },

  REPRODUCTION: {
    DISTANCE: 20
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
