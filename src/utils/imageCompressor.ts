/**
 * Client-Side Image Compressor & Safe Storage Helper
 * 
 * Prevents QuotaExceededError when saving uploaded images to localStorage
 * by compressing high-res photos to max 1200px and lightweight WebP/JPEG format.
 */

export function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<{ dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler arquivo de imagem.'));
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return reject(new Error('DataURL vazio.'));

      const img = new Image();
      img.onerror = () => reject(new Error('Falha ao carregar imagem para compressão.'));
      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        // Calculate aspect ratio scaling
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if canvas context fails
          return resolve({ dataUrl, width: img.naturalWidth, height: img.naturalHeight });
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try converting to WebP first, fallback to JPEG
        let compressedDataUrl = canvas.toDataURL('image/webp', quality);
        if (!compressedDataUrl.startsWith('data:image/webp')) {
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve({ dataUrl: compressedDataUrl, width, height });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[Storage Warning] Impossível salvar '${key}' no localStorage: Quota Exceeded.`, err);
    return false;
  }
}
