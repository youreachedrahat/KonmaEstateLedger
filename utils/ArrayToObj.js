function arrayToObject(arr) {
    // Initialize an empty object to store the result
    const result = {};
  
    // Iterate through the array
    for (let i = 0; i < arr.length; i++) {
      // Check if the array element is an object
      if (typeof arr[i] === 'object' && !Array.isArray(arr[i])) {
        // Merge the object into the result object using its index as the key
        result[i] = arr[i];
      } else {
        // If the element is not an object, you can choose to handle it differently
        // For example, you can skip it or throw an error
        // In this example, we'll skip non-object elements
        console.warn(`Element at index ${i} is not an object and will be skipped.`);
      }
    }
  
    return result;
  }

  export default arrayToObject;
  
  
  
  
  