export const calculateStablefordPoints = (
  par: number,
  strokes: number
): number => {
  const diff = strokes - par;

  if (diff >= 2) return 0; // Double bogey or worse
  if (diff === 1) return 1; // Bogey
  if (diff === 0) return 2; // Par
  if (diff === -1) return 3; // Birdie
  if (diff === -2) return 4; // Eagle
  return 5; // Albatross or better
};