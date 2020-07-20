export function searchFile(array, filePath) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].path === filePath) {
      const file = {
        name: array[i].name,
        path: array[i].path,
        size: array[i].size
      };
      
      return file
    }
  }
};