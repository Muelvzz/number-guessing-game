export default function generateRandomNumber(maxNumber: number): number {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(maxNumber);
  
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}