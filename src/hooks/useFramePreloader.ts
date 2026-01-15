import { useEffect, useState } from "react";

// ========== EASY ADJUSTMENTS ==========
const CONFIG = {
  totalFrames: 80,
  framePrefix: "frame_",
  framesFolder: "/frames/",
};
// ======================================

// Global cache for preloaded images
let globalImageCache: HTMLImageElement[] = [];
let isPreloading = false;
let preloadPromise: Promise<HTMLImageElement[]> | null = null;

export const preloadFrames = (): Promise<HTMLImageElement[]> => {
  if (globalImageCache.length === CONFIG.totalFrames) {
    return Promise.resolve(globalImageCache);
  }

  if (preloadPromise) {
    return preloadPromise;
  }

  isPreloading = true;

  preloadPromise = new Promise((resolve) => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= CONFIG.totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, "0");
      img.src = `${CONFIG.framesFolder}${CONFIG.framePrefix}${frameNumber}.webp`;

      img.onload = () => {
        loadedImages[i - 1] = img;
        loadedCount++;
        if (loadedCount === CONFIG.totalFrames) {
          globalImageCache = loadedImages;
          isPreloading = false;
          resolve(loadedImages);
        }
      };

      img.onerror = () => {
        loadedImages[i - 1] = img; // Still add even if failed
        loadedCount++;
        if (loadedCount === CONFIG.totalFrames) {
          globalImageCache = loadedImages;
          isPreloading = false;
          resolve(loadedImages);
        }
      };
    }
  });

  return preloadPromise;
};

export const useFramePreloader = () => {
  const [images, setImages] = useState<HTMLImageElement[]>(globalImageCache);
  const [isLoaded, setIsLoaded] = useState(globalImageCache.length === CONFIG.totalFrames);

  useEffect(() => {
    if (globalImageCache.length === CONFIG.totalFrames) {
      setImages(globalImageCache);
      setIsLoaded(true);
      return;
    }

    preloadFrames().then((loadedImages) => {
      setImages(loadedImages);
      setIsLoaded(true);
    });
  }, []);

  return { images, isLoaded, totalFrames: CONFIG.totalFrames };
};

// Start preloading immediately when module loads
if (typeof window !== "undefined") {
  // Delay slightly to not block initial render
  setTimeout(() => {
    preloadFrames();
  }, 100);
}
