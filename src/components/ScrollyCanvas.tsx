"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const TOTAL_FRAMES = 120;
const PRELOAD_RANGE = 20; // Load ±20 frames around current position

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingTasksRef = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastLoadedRangeRef = useRef<{ start: number; end: number }>({ start: -1, end: -1 });

  // Helper to format frame path
  const getFramePath = (index: number) => {
    const paddedIndex = String(index).padStart(3, "0");
    return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
  };

  // Load a single frame
  const loadFrame = useCallback((index: number): Promise<HTMLImageElement> => {
    // Return cached image if already loaded
    const cached = imagesRef.current.get(index);
    if (cached && cached.complete) {
      return Promise.resolve(cached);
    }

    // Return existing loading task if in progress
    const existingTask = loadingTasksRef.current.get(index);
    if (existingTask) {
      return existingTask;
    }

    // Create new loading promise
    const loadPromise = new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = getFramePath(index);
      img.onload = () => {
        imagesRef.current.set(index, img);
        loadingTasksRef.current.delete(index);
        resolve(img);
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${index}`);
        loadingTasksRef.current.delete(index);
        resolve(img); // Resolve even on error
      };
    });

    loadingTasksRef.current.set(index, loadPromise);
    return loadPromise;
  }, []);

  // Preload frames in range around current index
  const preloadFramesInRange = useCallback((currentIndex: number) => {
    const start = Math.max(0, currentIndex - PRELOAD_RANGE);
    const end = Math.min(TOTAL_FRAMES - 1, currentIndex + PRELOAD_RANGE);

    // Skip if range hasn't changed much
    const lastRange = lastLoadedRangeRef.current;
    if (lastRange.start !== -1 && start >= lastRange.start && end <= lastRange.end) {
      return;
    }

    lastLoadedRangeRef.current = { start, end };

    // Load frames in this range
    const framesToLoad: number[] = [];
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current.has(i)) {
        framesToLoad.push(i);
      }
    }

    if (framesToLoad.length === 0) {
      setIsInitialized(true);
      return;
    }

    // Load frames with progress tracking
    let loadedInBatch = 0;
    framesToLoad.forEach((index) => {
      loadFrame(index).then(() => {
        loadedInBatch++;
        const totalProgress = (imagesRef.current.size / TOTAL_FRAMES) * 100;
        setLoadingProgress(Math.round(totalProgress));
        if (loadedInBatch === framesToLoad.length) {
          setIsInitialized(true);
        }
      });
    });
  }, [loadFrame]);

  // Map scroll progress (0 to 1) to frame index (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Draw a frame to canvas with object-fit: cover scaling
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current.get(index);
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

  // Initialize: preload first frame and nearby frames
  useEffect(() => {
    preloadFramesInRange(0);
  }, [preloadFramesInRange]);

  // Listen to scroll frame updates
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
    preloadFramesInRange(index);
    drawFrame(index);
  });

  // Handle Resize and draw initial frame
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Force redraw of current frame
      const currentProgress = scrollYProgress.get();
      const currentIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
      drawFrame(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // trigger initial draw

    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, scrollYProgress]);

  return (
    <>
      {/* Smart Loader Overlay - only shows while initializing or on error */}
      {(!isInitialized || loadingProgress < 10) && (
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
            <span className="text-sm font-mono text-neutral-400">{loadingProgress}% Initialized</span>
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
