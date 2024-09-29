export function imageToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result) {
          resolve(fileReader.result.toString());
        }
      };
      fileReader.onerror = () => {
        reject(new Error("Error reading file"));
      };
    });
  }
