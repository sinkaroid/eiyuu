// Client
import Eiyuu from "./class/Eiyuu";

/**
 * Optional methods
 * Converts arrays with each string separated by a comma.
 * @param {string[]} data - The array of strings to convert.
 * @return {string} The converted string.
 */
function parseString(data: string[]): string {
  return data.join(", ");
}

export { Eiyuu, parseString };
