'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

import { Button } from '~/components/button';
import { ExternalLink } from '~/components/external-link';
import { Logo } from '~/components/logo';
import { Headline, Body } from '~/components/system';

export const Hero = () => {
  const ref = useRef(null);

  return (
    <div ref={ref} className="bg-gray-100">
      <div className="flex h-full w-full flex-col items-center justify-around px-12 py-24 l:min-h-screen l:p-0">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              y: ['0.75rem', '-0.75rem'],
              rotateZ: [0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0.5, -0.5],
            }}
            style={{ x: '0.125rem' }}
            transition={{
              ease: 'easeInOut',
              repeat: Infinity,
              duration: 4,
              repeatType: 'mirror',
            }}
          >
            <img src="/minnie.png" alt="Minnie" className="w-12 object-contain" />
          </motion.div>
          <motion.div
            animate={{
              opacity: [1, 0.25],
              scaleX: [1, 0.5],
              scaleY: [1, 0.5],
            }}
            transition={{
              ease: 'easeInOut',
              repeat: Infinity,
              duration: 4,
              repeatType: 'mirror',
            }}
          >
            <div className="h-0.5 w-8 rounded-full bg-gray-400" />
          </motion.div>
        </div>
        <div className="mt-24 flex w-full max-w-xl flex-col items-center justify-center l:mt-0">
          <div className="inline-flex flex-col items-center gap-4">
            <Logo className="relative z-0 w-full" />
            <ExternalLink
              to="https://vercel.com/blog/ai-accelerator-participants"
              className="inline-flex items-center gap-4"
            >
              <img src="/vercel-ai.png" className="h-6 w-auto" alt="" />
              <div>
                <div className="mt-0.5 text-6pt uppercase tracking-wider text-gray-500">
                  Backed by
                </div>
                <div className="mt-0.5 text-9pt font-bold">Vercel AI Accelerator</div>
              </div>
            </ExternalLink>
          </div>
          <Headline size="xs" className="mt-16 text-center l:mt-8 l:whitespace-nowrap">
          [IN PRIVATE ALPHA] The continuous finetuning platform for{' '}
            <ExternalLink to="https://www.latent.space/p/ai-engineer">AI engineers</ExternalLink>!
          </Headline>
          <Body size="sm" className="mx-auto mt-2 text-center l:mt-1">
            The OpenAI-superset way to build AI Apps with smaller models.
          </Body>
          <div className="relative z-100 mt-4 flex items-center justify-center">
            <div className="space-x-4">
              <Button to="https://buttondown.email/swyx" variant="yellow">
                Sign up
              </Button>
              <Button to="#benefits">Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
