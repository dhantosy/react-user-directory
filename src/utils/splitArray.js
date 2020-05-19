export const splitArray = (array, length) => {
  const chunks = Array.from({ length: length }, (_) => []);
  array.forEach((value, index) => chunks[index % chunks.length].push(value));

  return chunks;
}
