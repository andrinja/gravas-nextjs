import { AnimatePresence, MotionConfig, motion } from "framer-motion";

// Crossfade-and-lift between routes. `mode="wait"` plays the old page's exit
// before the new one enters, and the scroll-to-top happens in that gap, so
// the new page never starts mid-scroll. `initial={false}` leaves the first
// server-rendered paint alone. MotionConfig honours prefers-reduced-motion.
const variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

const PageTransition = ({ routeKey, children }) => (
  <MotionConfig reducedMotion="user">
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={routeKey}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </MotionConfig>
);

export default PageTransition;
