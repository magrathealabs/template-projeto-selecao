export default function parseStringAsArray(arrayAsString: string) {
  if (arrayAsString.includes(',')) {
    const tagsArray = arrayAsString.split(',').map(tag => tag.trim());

    return [...new Set(tagsArray)];
  }
  return arrayAsString.split(' ');
}
