import React, { useEffect, useState } from 'react';
import { ANNOUNCEMENTS } from '../mock';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full bg-ansha-accent text-ansha-beige text-xs tracking-widest uppercase">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            {ANNOUNCEMENTS[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
