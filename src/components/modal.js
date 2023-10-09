'use client';

import { Modal as Component } from '@candycode/core/modal';
import { Card } from './system';
import { Icon } from './icon';

export const Modal = ({ isOpen, onOpenChange, children, ...rest }) => {
  return (
    <Component
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      overlayAnimations={['blur', 'darken']}
      wrapperClassName="fixed z-[9000] items-start p-4 t:p-8 l:p-16 max-h-screen"
      shellAnimations={['fade']}
      shellClassName="relative w-full h-full max-w-5xl"
      transition={{ type: 'spring', duration: 0.8, bounce: 0 }}
      {...rest}
    >
      <Card className="relative h-full w-full max-w-full p-4 t:p-8 l:p-16">
        {children}
        <button
          onClick={onOpenChange}
          className="absolute right-0 top-0 z-[9001] inline-block p-4 text-black transition duration-300 ease-in-out hover:text-purple"
        >
          <Icon icon="close-window" className="h-10 w-auto" />
        </button>
      </Card>
    </Component>
  );
};
