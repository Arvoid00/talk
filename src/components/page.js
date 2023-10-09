'use client';

import { motion } from 'framer-motion';

import { Header } from '~/components/header';
import { Footer } from '~/components/footer';
import { SubscribeModal } from '~/components/subscribe-modal';

export const Page = ({ children }) => {
  return (
    <>
      <div id="__next" className="relative min-h-screen bg-gray-100">
        <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
          <Header />
          <main className="mx-auto w-full max-w-lg l:max-w-none">{children}</main>
          <Footer />
        </motion.div>
      </div>
      <SubscribeModal />
    </>
  );
};

const variants = {
  initial: { opacity: 0, transition: { ease: 'easeInOut', duration: 0.4, bounce: 0 } },
  animate: { opacity: 1, transition: { ease: 'easeInOut', duration: 0.8, bounce: 0 } },
  exit: { opacity: 0, transition: { ease: 'easeInOut', duration: 0.4, bounce: 0 } },
};
