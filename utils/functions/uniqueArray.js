/**
 * Returns a new array containing only unique elements from the original array.
 * Uses a `Set` to remove duplicates.
 *
 * @param {Array} arr - The original array from which to extract unique elements.
 * @returns {Array}     A new array consisting of unique elements.
 */
export function uniqueArray(arr) {
  const uniqueSet = new Set(arr);
  return [...uniqueSet];
}
