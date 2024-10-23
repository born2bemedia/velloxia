export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (customDelay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: customDelay },
  }),
};