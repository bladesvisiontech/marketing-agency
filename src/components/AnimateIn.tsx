"use client";
import { useEffect, useRef } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function AnimateIn({
  children,
  className = "",
  stagger = false,
  delay = 0,
  as: Tag = "div",
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const dataAttr = stagger ? { "data-stagger": "" } : { "data-animate": "" };

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} {...dataAttr}>
      {children}
    </Tag>
  );
}
