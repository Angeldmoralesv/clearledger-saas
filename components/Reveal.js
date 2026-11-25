"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, delay = 0, as = "div" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </Comp>
  );
}
