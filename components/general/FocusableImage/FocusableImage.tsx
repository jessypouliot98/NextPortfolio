import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { preventDefaultEventCallback } from '@/utils/event';

export type FocusableImageProps = {
  src: string,
  alt: string,
  className?: string,
};

export const FocusableImage: React.FC<FocusableImageProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const src = useMemo(() => {
    if (typeof props.src === 'string' && /^\/\//.test(props.src)) {
      return 'https:' + props.src;
    }

    return props.src;
  }, [props.src]);

  return (
    <AnimatePresence initial>
      <motion.img layoutId={src} {...props} className={clsx('cursor-pointer', props.className)} src={src} onClick={() => setIsOpen(true)} />

      {isOpen && (
        <motion.div
          className="fixed cursor-pointer trbl bg-gray-900 bg-opacity-90 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <div className="h-full flex flex-center p-4 lg:p-20">
            <motion.img layoutId={src} className="w-full shadow cursor-default" src={src} alt={props.alt} onClick={preventDefaultEventCallback} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
