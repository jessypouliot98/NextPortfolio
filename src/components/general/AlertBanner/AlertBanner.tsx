import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '../Button/Button';

export type AlertBannerVariant = 'success' | 'warning' | 'error';

export type AlertBannerProps = {
  children: React.ReactNode;
  className?: string;
  variant: AlertBannerVariant;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ children, variant, className }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <AnimatePresence initial exitBeforeEnter>
      {isShown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={clsx(
            'flex flex-center px-4 py-2 rounded-lg shadow',
            variant === 'success' && 'bg-green-500 text-white',
            variant === 'warning' && 'bg-amber-400 text-white',
            variant === 'error' && 'bg-red-400 text-white',
            className
          )}
        >
          <div className="flex-1">
            {children}
          </div>
          <div className="ml-4">
            <Button onClick={() => setIsShown(false)}>
              <FaWindowClose />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};