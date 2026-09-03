"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  color: string;
  size: number;
}

export default function InteractiveNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node labels & configurations
    const labels = [
      { text: "System Administration", color: "#168be0" },
      { text: "Web Development", color: "#4ab7ee" },
      { text: "Cisco  and Juniper", color: "#62c4f2" },
      { text: "Network Engineering", color: "#0c5ca8" },
      { text: "Platforms", color: "#168be0" },
      { text: "Ansible", color: "#4ab7ee" },
      { text: "Automation", color: "#168be0" },
      { text: "Power Apps", color: "#62c4f2" },
      { text: "Database", color: "#168be0" },
      { text: "CI/CD Pipeline", color: "#4ab7ee" },
      { text: "Dashboards", color: "#0c5ca8" },
      { text: "API Gateway", color: "#62c4f2" },
      { text: "Security", color: "#168be0" },
    ];

    const nodes: Node[] = [];

    // Initialize nodes
    const numNodes = Math.min(Math.floor((width * height) / 18000), 50); // density-based
    for (let i = 0; i < numNodes; i++) {
      const config = labels[i % labels.length];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        label: config.text,
        color: config.color,
        size: Math.random() * 3 + 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Node connection threshold
      const maxDistance = 140;

      // Update & Draw Nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep inside bounds slightly
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Mouse magnetic effect
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          node.x -= (dx / dist) * force * 0.8;
          node.y -= (dy / dist) * force * 0.8;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw node text (labels)
        ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
        ctx.font = "10px monospace";
        ctx.fillText(node.label, node.x + 8, node.y + 4);
      });

      // Draw Connection Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            // Create a gradient connection
            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            grad.addColorStop(0, n1.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
            grad.addColorStop(1, n2.color + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw mouse lines
      if (mouseRef.current.x !== -1000) {
        nodes.forEach((node) => {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            const alpha = (1 - dist / mouseRef.current.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(22, 139, 224, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
