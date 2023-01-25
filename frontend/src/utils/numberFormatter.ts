
/**
 * Takes a big number and returns a string representation in a compact format
 * @param numberToFormat: Number to format
 * @returns a lowercased string
 */
export const formatBigNumberToString = (numberToFormat: number): string => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short', maximumSignificantDigits: 3 });
  return formatter.format(numberToFormat).toLowerCase();
};

/**
 * Takes in a number as meters and returns it formatted. Numbers larger that 999
 * are formatted as kilometers 
 * @param metersToFromat: the number to format 
 * @returns a string
 */
export const formatMeters = (metersToFromat: number): string => {
  if (metersToFromat >= 1000) {
    const toKilometers = metersToFromat / 1000;
    const kilometersRounded = Math.round((toKilometers + Number.EPSILON) * 100) / 100;
    return `${kilometersRounded} km`;
  }

  return `${Math.round(metersToFromat)} m`;
};