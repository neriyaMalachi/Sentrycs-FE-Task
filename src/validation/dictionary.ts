export const words = ["apple", "grape", "mango", "peach", "berry"];

export const isValidWord = (word: string): boolean => {
  return words.includes(word.toLowerCase());
};
