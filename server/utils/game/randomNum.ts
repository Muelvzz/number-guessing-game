export function getRandomInt(min: number, max: number): number {
  // Ensure the inputs are whole integers
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  
  // The maximum and minimum are inclusive
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}