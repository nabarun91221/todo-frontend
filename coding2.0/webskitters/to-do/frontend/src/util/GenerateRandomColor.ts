export default function generateMutedColor() {
  // Generate random HSL values for muted colors
  const hue = Math.floor(Math.random() * 360); // Random hue (0-360)
  const saturation = Math.floor(Math.random() * 30) + 20; // Low saturation (20-50%)
  const lightness = Math.floor(Math.random() * 30) + 50; // Moderate lightness (50-80%)

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
    else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
    else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
    else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
    else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return hslToHex(hue, saturation, lightness);
}

// // Example usage
// console.log(generateMutedColor()); // e.g., "#a6b7c1"
// console.log(generateMutedColor()); // e.g., "#d9a882"
// console.log(generateMutedColor()); // e.g., "#88c1a6"
