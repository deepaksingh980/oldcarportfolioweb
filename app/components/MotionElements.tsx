// components/ui/MotionElements.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

// Typed motion elements (no more className / props errors)
export const MotionDiv = motion.div as React.FC<
  React.HTMLAttributes<HTMLDivElement> & import("framer-motion").MotionProps
>;

export const MotionSection = motion.section as React.FC<
  React.HTMLAttributes<HTMLElement> & import("framer-motion").MotionProps
>;

export const MotionH1 = motion.h1 as React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & import("framer-motion").MotionProps
>;

export const MotionP = motion.p as React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & import("framer-motion").MotionProps
>;
export const MotionImg = motion.img as React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & import("framer-motion").MotionProps
>;