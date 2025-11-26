import React, { useRef, useEffect } from "react";
import "./PlaystationBackground.css";

const PlaystationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Shapes inspired by Playstation/Xbox
    const shapes = [
      { type: "circle", x: 200, y: 200, r: 60, dx: 1.2, dy: 1.1, color: "#00eaff" },
      { type: "rect", x: 600, y: 300, w: 120, h: 40, dx: -1.1, dy: 1.3, color: "#ff00c8" },
      { type: "triangle", x: 900, y: 100, size: 80, dx: 1.4, dy: -1.2, color: "#00ff6a" },
      { type: "circle", x: 400, y: 600, r: 40, dx: -1.3, dy: -1.1, color: "#fff700" },
    ];

    function drawTriangle(x: number, y: number, size: number, color: string) {
      ctx!.beginPath();
      ctx!.moveTo(x, y);
      ctx!.lineTo(x + size, y);
      ctx!.lineTo(x + size / 2, y - size);
      ctx!.closePath();
      ctx!.fillStyle = color;
      ctx!.globalAlpha = 0.7;
      ctx!.fill();
      ctx!.globalAlpha = 1;
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      // Gradient background
      const grad = ctx!.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#0f2027");
      grad.addColorStop(0.5, "#2c5364");
      grad.addColorStop(1, "#1c92d2");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, width, height);

      shapes.forEach((shape) => {
        if (shape.type === "circle" && typeof shape.r === "number") {
          ctx!.beginPath();
          ctx!.arc(shape.x, shape.y, shape.r, 0, 2 * Math.PI);
          ctx!.fillStyle = shape.color;
          ctx!.globalAlpha = 0.6;
          ctx!.shadowColor = shape.color;
          ctx!.shadowBlur = 30;
          ctx!.fill();
          ctx!.globalAlpha = 1;
          ctx!.shadowBlur = 0;
        } else if (shape.type === "rect" && typeof shape.w === "number" && typeof shape.h === "number") {
          ctx!.fillStyle = shape.color;
          ctx!.globalAlpha = 0.6;
          ctx!.shadowColor = shape.color;
          ctx!.shadowBlur = 30;
          ctx!.fillRect(shape.x, shape.y, shape.w, shape.h);
          ctx!.globalAlpha = 1;
          ctx!.shadowBlur = 0;
        } else if (shape.type === "triangle" && typeof shape.size === "number") {
          drawTriangle(shape.x, shape.y, shape.size, shape.color);
        }
        // Move shapes
        shape.x += shape.dx;
        shape.y += shape.dy;
        // Bounce off edges
        if (shape.type === "circle" && typeof shape.r === "number") {
          if (shape.x + shape.r > width || shape.x - shape.r < 0) shape.dx *= -1;
          if (shape.y + shape.r > height || shape.y - shape.r < 0) shape.dy *= -1;
        } else if (shape.type === "rect" && typeof shape.w === "number" && typeof shape.h === "number") {
          if (shape.x + shape.w > width || shape.x < 0) shape.dx *= -1;
          if (shape.y + shape.h > height || shape.y < 0) shape.dy *= -1;
        } else if (shape.type === "triangle" && typeof shape.size === "number") {
          if (shape.x + shape.size > width || shape.x < 0) shape.dx *= -1;
          if (shape.y > height || shape.y - shape.size < 0) shape.dy *= -1;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="playstation-bg-canvas" style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1}} />;
};

export default PlaystationBackground;
