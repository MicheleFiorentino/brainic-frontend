/*return CSS style mixed color*/

export function mixColors(startColor: string, endColor: string, gradientPercentage: number): string {
  const startRGB = hexToRGB(startColor);
  const endRGB = hexToRGB(endColor);

  const mixedRGB = startRGB.map((startChannel, index) => {
    const endChannel = endRGB[index];
    const mixedChannel = startChannel + (endChannel - startChannel) * gradientPercentage;
    return Math.round(mixedChannel);
  });

  return `rgb(${mixedRGB.join(', ')})`;
}

function hexToRGB(hexColor: string): number[] {
  const hex = hexColor.slice(1); // Remove the '#'
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return [r, g, b];
}
