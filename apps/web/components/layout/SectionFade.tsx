"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SectionFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SectionFade({ children, className = '', delay = 0 }: SectionFadeProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
