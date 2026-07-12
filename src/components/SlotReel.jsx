// components/SlotReel.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function SlotReel({ text, direction, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: direction >= 0 ? "110%" : "-110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: direction >= 0 ? "-110%" : "110%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.65, 0, 0.35, 1] }}
          className="block w-full whitespace-nowrap text-center"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}