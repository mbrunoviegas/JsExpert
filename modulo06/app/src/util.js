import safeRegex from 'safe-regex'
 
export class InvalidRegexError extends Error {
  constructor(exp) {
    super(`This regex is invalid: ${exp}`);
    this.name = 'InvalidRegexError';
  }
}

export const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp)
  
  if (isSafe) return exp
  
  throw new InvalidRegexError(exp)
}
