export default class Params {
  constructor (axiom, rules, it, angle, branchLength, branchRadius, branchReduction, branchMinRadius) {
    this.axiom = axiom || 'F'
    this.rules = rules
    this.iterations = it || 4
    this.angle = angle || 25
    this.branchLength = branchLength || 3
    this.branchRadius = branchRadius || 0.4
    this.branchReduction = branchReduction || 0.1
    this.branchMinRadius = branchMinRadius || 0.1
  }

  rewriteWithRules (text) {
    for (let i = 0; i < this.iterations; i++) {
      let newText = ''
      for (let char of text) {
        let found = false
        for (let j = 0; j < this.rules.length; j++) {
          if (char == this.rules[j].entry) {
            found = true
            newText	+= this.rules[j].exit
            break
          }
        }
        if (!found) newText += char
      }
      text = newText
    }

    return text
  }
}
