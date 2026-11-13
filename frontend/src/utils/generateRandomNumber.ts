export default function generateRandomNumber(maxNumber: number): number {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(maxNumber);
  
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}