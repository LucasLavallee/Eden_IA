const randomFloat = (a, b) => {
  return Math.random() * (b - a) + a
}

const randomInt = (a, b) => {
  return Math.floor(Math.random() * (b - a)) + a
}

const degRadian = (degre) => {
  return degre * (Math.PI / 180)
}

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}

const clamp = (value, minLimit, maxLimit) => {
  if (value < minLimit) { return minLimit }
  if (value > maxLimit) { return maxLimit }
  return value
}

export {
  degRadian, randomFloat, distance, randomInt, clamp
}
