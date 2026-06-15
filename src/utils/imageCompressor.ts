/**
 * Utility to compress and resize images client-side before saving to localStorage.
 * Keeps file size small to prevent hitting standard 5MB localStorage limits.
 */
export function compressImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Apply scale ratios
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not obtain canvas 2D context"));
          return;
        }

        // Fill background white to handle PNG transparency beautifully as JPEG
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);
        
        // Export as JPEG with custom quality factor
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = (e) => reject(new Error("Failed to load and decode image: " + JSON.stringify(e)));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read raw file upload"));
    reader.readAsDataURL(file);
  });
}
