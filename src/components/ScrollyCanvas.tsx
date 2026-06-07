"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const TOTAL_FRAMES = 120;

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to format frame path
  const getFramePath = (index: number) => {
    const paddedIndex = String(index).padStart(3, "0");
    return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
  };

  // Map scroll progress (0 to 1) to frame index (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Draw a frame to canvas with object-fit: cover scaling
  const drawFrame = useCallback((index: number, imgList: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    if (!canvas || imgList.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgList[index];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    // Cover calculation
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload all frames on mount
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    let isCancelled = false;

    const preloadImages = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }).map((_, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = getFramePath(index);
          img.onload = () => {
            if (isCancelled) return;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve(img);
          };
          img.onerror = () => {
            if (isCancelled) return;
            console.error(`Failed to load frame ${index}`);
            // Resolve anyway to avoid blocking the loader
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve(img);
          };
          loadedImages[index] = img;
        });
      });

      try {
        await Promise.all(promises);
        if (!isCancelled) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error loading image sequence", err);
          setError("Failed to load creative assets.");
        }
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Listen to scroll frame updates
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
    drawFrame(index, images);
  });

  // Handle Resize and draw initial frame
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Force redraw of current frame
      const currentProgress = scrollYProgress.get();
      const currentIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
      drawFrame(currentIndex, images);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // trigger initial draw

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, drawFrame, scrollYProgress]);

  return (
    <>
      {/* Premium Loader Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-white">
          <div className="relative flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <div className="text-2xl font-light tracking-widest text-neutral-300">
              HARIS <span className="font-semibold text-white">PORTFOLIO</span>
            </div>
            <div className="h-[2px] w-48 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-sm font-mono text-neutral-400">{loadingProgress}% Loaded</span>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-cover"
        style={{
          filter: "brightness(0.95) contrast(1.05)", // subtle enhancement
        }}
      />
    </>
  );
}
