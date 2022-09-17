import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '../Button/Button';

export type AlertBannerType = 'warning';

export type AlertBannerProps = {
  children: React.ReactNode,
  className?: string,
  type: AlertBannerType,
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ children, className }) => {
  const [isShown, setIsShown] = useState(true);

  return (
    <AnimatePresence initial exitBeforeEnter>
      {isShown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={clsx('flex flex-center px-4 py-2 rounded-lg shadow bg-amber-400 text-white', className)}
        >
          <div className="flex-1">
            {children}
          </div>
          <div className="ml-4">
            <Button onPress={() => setIsShown(false)}>
              <FaWindowClose />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};