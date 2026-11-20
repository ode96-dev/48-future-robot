"use client";

import React, { useEffect, useRef } from "react";
import { useMotionValueEvent, MotionValue } from "motion/react";

interface HeroPixelTypographyProps {
  imageSrc: string;
  scrollProgress: MotionValue<number>;
  onInspect: () => void;
  label: string;
}

interface PixelCell {
  x: number;
  y: number;
  size: number;
  color: string;
  isEdge: boolean;
  phase: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
}

export function HeroPixelTypography({
  imageSrc,
  scrollProgress,
  onInspect,
  label,
}: HeroPixelTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<PixelCell[]>([]);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const scrollFactorRef = useRef(0);
  const needsDrawRef = useRef(true);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    scrollFactorRef.current = Math.max(0, Math.min(1, latest));
    needsDrawRef.current = true;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let isDisposed = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    const buildPixelMatrix = () => {
      if (isDisposed) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width < 40 || height < 40) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d");
      if (!maskCtx) return;

      const computedStyle = getComputedStyle(document.documentElement);
      const displayFont =
        computedStyle.getPropertyValue("--font-display").trim() ||
        "Syne, sans-serif";

      const fontSize = Math.min(width * 0.72, height * 0.82);
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "#111110";
      maskCtx.textAlign = "center";
      maskCtx.textBaseline = "middle";
      maskCtx.font = `800 ${fontSize}px ${displayFont}`;
      maskCtx.fillText("48", width / 2, height / 2 + fontSize * 0.03);

      const maskData = maskCtx.getImageData(0, 0, width, height).data;

      let imgData: Uint8ClampedArray | null = null;
      if (img.complete && img.naturalWidth > 0) {
        const imgCanvas = document.createElement("canvas");
        imgCanvas.width = width;
        imgCanvas.height = height;
        const imgCtx = imgCanvas.getContext("2d");
        if (imgCtx) {
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const boxAspect = width / height;
          let drawW = width;
          let drawH = height;
          if (imgAspect > boxAspect) {
            drawH = height;
            drawW = height * imgAspect;
          } else {
            drawW = width;
            drawH = width / imgAspect;
          }
          const zoom = 1.08;
          drawW *= zoom;
          drawH *= zoom;
          const dx = (width - drawW) / 2;
          const dy = (height - drawH) / 2 - height * 0.02;
          imgCtx.drawImage(img, dx, dy, drawW, drawH);
          imgData = imgCtx.getImageData(0, 0, width, height).data;
        }
      }

      const step = width < 440 ? 6 : 7;
      const gap = 1.35;
      const cellSize = step - gap;
      const cells: PixelCell[] = [];

      const isInsideMask = (px: number, py: number) => {
        if (px < 0 || py < 0 || px >= width || py >= height) return false;
        return maskData[(py * width + px) * 4 + 3] > 120;
      };

      for (let y = Math.floor(step / 2); y < height; y += step) {
        for (let x = Math.floor(step / 2); x < width; x += step) {
          if (!isInsideMask(x, y)) continue;

          const edgeOffset = step * 1.4;
          const isEdge =
            !isInsideMask(Math.round(x - edgeOffset), y) ||
            !isInsideMask(Math.round(x + edgeOffset), y) ||
            !isInsideMask(x, Math.round(y - edgeOffset)) ||
            !isInsideMask(x, Math.round(y + edgeOffset));

          let color = "#111110";

          if (imgData) {
            const idx = (y * width + x) * 4;
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];

            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const saturation = Math.max(r, g, b) - Math.min(r, g, b);

            if (isEdge) {
              color = lum > 0.72 ? "#1E1D1B" : "#111110";
            } else if (saturation > 32 && b > r + 20) {
              color = `rgb(${Math.round(r * 0.85)}, ${Math.round(g * 0.95)}, ${Math.min(255, Math.round(b * 1.05))})`;
            } else {
              const nx = x / width;
              const ny = y / height;
              const distFromCenter = Math.hypot(
                (nx - 0.5) * 1.1,
                (ny - 0.48) * 0.95,
              );

              if (distFromCenter > 0.42 && lum > 0.65) {
                const darkTone = Math.round(24 + (1 - lum) * 35);
                color = `rgb(${darkTone}, ${darkTone}, ${darkTone - 2})`;
              } else {
                const contrasted = Math.pow(lum, 1.15);
                const shade = Math.round(17 + contrasted * 218);
                color = `rgb(${shade}, ${Math.max(15, shade - 2)}, ${Math.max(14, shade - 6)})`;
              }
            }
          }

          cells.push({
            x,
            y,
            size: cellSize,
            color,
            isEdge,
            phase: ((x * 13 + y * 7) % 100) / 100,
            vx: 0,
            vy: 0,
            ox: 0,
            oy: 0,
          });
        }
      }

      cellsRef.current = cells;
      needsDrawRef.current = true;
    };

    const renderFrame = () => {
      if (isDisposed) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const cells = cellsRef.current;

      const pointer = pointerRef.current;
      const scrollDispersion = scrollFactorRef.current;
      let anyMoving = false;

      if (needsDrawRef.current || pointer.active || !reducedMotion) {
        ctx.clearRect(0, 0, width, height);

        const radius = 84;
        const radiusSq = radius * radius;

        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];

          if (!reducedMotion) {
            let targetOx = 0;
            let targetOy = 0;

            if (pointer.active) {
              const dx = cell.x - pointer.x;
              const dy = cell.y - pointer.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < radiusSq && distSq > 0.01) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / radius) * 18;
                targetOx += (dx / dist) * force;
                targetOy += (dy / dist) * force;
              }
            }

            if (scrollDispersion > 0.02) {
              const drift = scrollDispersion * scrollDispersion * 46;
              targetOy += (cell.phase - 0.4) * drift;
              targetOx += (cell.phase - 0.5) * drift * 0.45;
            }

            const stiffness = 0.16;
            const damping = 0.76;
            cell.vx = (cell.vx + (targetOx - cell.ox) * stiffness) * damping;
            cell.vy = (cell.vy + (targetOy - cell.oy) * stiffness) * damping;
            cell.ox += cell.vx;
            cell.oy += cell.vy;

            if (
              Math.abs(cell.vx) > 0.04 ||
              Math.abs(cell.vy) > 0.04 ||
              Math.abs(cell.ox) > 0.08 ||
              Math.abs(cell.oy) > 0.08
            ) {
              anyMoving = true;
            }
          }

          ctx.fillStyle = cell.color;
          ctx.fillRect(
            cell.x + cell.ox - cell.size / 2,
            cell.y + cell.oy - cell.size / 2,
            cell.size,
            cell.size,
          );
        }

        needsDrawRef.current = anyMoving || pointer.active;
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    const init = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // Fallback if font API is unavailable
      }
      if (isDisposed) return;
      buildPixelMatrix();
      renderFrame();
    };

    img.onload = () => {
      if (isDisposed) return;
      buildPixelMatrix();
      if (reducedMotion) renderFrame();
    };
    img.src = imageSrc;

    init();

    const resizeObserver = new ResizeObserver(() => {
      buildPixelMatrix();
      if (reducedMotion) renderFrame();
    });
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [imageSrc]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
    needsDrawRef.current = true;
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    needsDrawRef.current = true;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onInspect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onInspect();
        }
      }}
      aria-label={label}
      className="relative w-full h-full min-h-110 sm:min-h-135 lg:min-h-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 select-none"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}
