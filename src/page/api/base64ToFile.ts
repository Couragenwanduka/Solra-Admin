const base64ToFile = (base64String:string, fileName:string, mimeType:string) => {
    const byteCharacters = atob(base64String.split(',')[1]); // Decode base64 string
    const byteArrays = [];
  
    // Convert the decoded string into byte arrays
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    // Create a Blob from the byte arrays
    const blob = new Blob(byteArrays, { type: mimeType });
    // Convert Blob to File object
    return new File([blob], fileName, { type: mimeType });
  };
  
export default base64ToFile;