import React, { useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

type Effect = {
  top?: number | string,
  right?: number | string,
  bottom?: number | string,
  left?: number | string,
  filled?: boolean,
  blur?: boolean,
};

export type StylishBoxProps = {
  children: React.ReactNode,
  className?: string,
  effects: Effect[],
}

export const StylishBox: React.FC<StylishBoxProps> = ({ children, className, effects }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['30%', '-30%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['50%', '-50%']);

  return (
    <AnimatePresence initial={true}>
      <div className={clsx('relative z-10', className)}>
        <div className="relative z-20">{children}</div>
        <div className="absolute trbl">
          <div className="relative w-full h-full -z-10 pointer-events-none">
            {effects.map((effect, i, { length }) => {
              const {
                top,
                right,
                bottom,
                left,
                filled = (i + 1) % 2 === 0,
                blur = (i + 1) % 3 === 0,
              } = effect;
              const rotation = (['rotate-12', '-rotate-12', 'rotate-45'] as const)[i % 3];
              const size = (['w-16 h-16', 'w-20 h-20', 'w-24 h-24'] as const)[i % 3];
              const translateY = ([y1, y2, y3] as const)[i % 3];

              return (
                <motion.div key={i} className="absolute" style={{ translateY, top, right, bottom, left }}>
                  <div
                    className={clsx(
                      'style-box',
                      'transform',
                      blur && 'filter blur',
                      rotation,
                    )}
                  >
                    <motion.div
                      className={clsx(
                        'rounded-2xl shadow-lg',
                        filled ? 'bg-primary' : 'border-4 border-blue-500',
                        size,
                      )}
                      initial={{ opacity: 0, size: 1.1, rotate: i % 2 === 0 ? 45 : -45 }}
                      animate={{ opacity: 1, size: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 3 * (i / length) }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
