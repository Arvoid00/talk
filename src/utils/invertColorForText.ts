// thanks claude
export const invertColorForText = (bgColor: string): string => {
  // Convert hex to RGB
  let r = parseInt(bgColor.substring(1, 3), 16);
  let g = parseInt(bgColor.substring(3, 5), 16);
  let b = parseInt(bgColor.substring(5, 7), 16);

  // Calculate luminance
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return black or white color based on luminance
  return luminance > 128 ? `#000` : `#fff`;
};
