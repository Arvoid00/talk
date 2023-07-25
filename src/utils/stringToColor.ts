/* eslint-disable no-bitwise */
// thanks chatgpt
export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // Multiply by a prime number and add ASCII value of current character
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = `#`;
  for (let i = 0; i < 3; i++) {
    // Bitwise AND operation with 'hash', shifted by (i * 8) bits
    const value = (hash >> (i * 8)) & 0xff;
    // Convert to hexadecimal and append to 'color' string
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};
