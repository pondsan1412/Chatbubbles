import { motion, usePresence } from 'framer-motion';
import React from 'react';
import './bubble.css';

const transition = {
  type: 'spring',
  stiffness: 500,
  damping: 50,
  default: {
    duration: 0.4
  }
};

const Bubble = ({ id, children, dy, fillColour, strokeColour, avatarUrl }) => {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: 'out',
    animate: 'in',
    variants: {
      in: { opacity: 1, translateY: 0 },
      out: { opacity: 1, translateY: `${dy}px` }
    },
    exit: { opacity: 0, translateY: 0 },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition
  };

  return (
    <motion.div key={id} className="bubble" {...animations}>
      <div style={{ position: 'static' }}>
        <div className="bubble-content" style={{ backgroundColor: fillColour, color: strokeColour }}>
          {avatarUrl && <img src={avatarUrl} alt="Avatar" className="avatar" />}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Bubble;
