export const easeHive = [0.22, 1, 0.36, 1] as const;

export const durationStandard = 0.55;
export const durationFast = 0.28;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const reducedMotionFadeUp = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
