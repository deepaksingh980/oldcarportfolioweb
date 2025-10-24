"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

// ✅ Correct combined type for <motion.section>
type AnimatedSectionProps = MotionProps &
  React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
    className?: string;
  };

export default function AnimatedSection({
  children,
  className,
  ...rest
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }} 
      {...rest}
    >
      {children}
    </motion.section>
  );
}
