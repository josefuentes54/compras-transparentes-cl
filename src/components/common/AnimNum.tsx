"use client";

import { useState, useEffect } from "react";

interface AnimNumProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

export function AnimNum({ target, prefix = "", suffix = "" }: AnimNumProps) {
  const [v, setV] = useState(0);

  useEffect(() => {
    let n = 0;
    const s = target / 50;
    const id = setInterval(() => {
      n += s;
      if (n >= target) {
        setV(target);
        clearInterval(id);
      } else {
        setV(Math.floor(n));
      }
    }, 16);
    return () => clearInterval(id);
  }, [target]);

  return (
    <span>
      {prefix}
      {v.toLocaleString("es-CL")}
      {suffix}
    </span>
  );
}
