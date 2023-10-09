'use client';

import { Credits } from '@candycode/core/credits';

import { ExternalLink } from '~/components/external-link';
import { Logo } from '~/components/logo';
import { Social } from '~/components/social';

export const Footer = () => {
  return (
    <>
      <footer className="relative z-10 flex flex-col items-center gap-8 font-apparat l:items-start l:gap-8 l:px-16 l:pb-8 d:flex-row d:gap-16 d:px-32">
        <div className="space-y-8 l:contents">
          <div className="flex flex-col">
            <div>
              <Logo variant="black" className="h-12" />
            </div>
            <div className="mt-2 text-6pt uppercase leading-snug tracking-wider text-gray-700">
              Copyright &copy; {CURRENT_YEAR} Smol AI Company.
              <br />
              All rights reserved.
            </div>
          </div>
          <nav className="mt-2 flex flex-col gap-8 text-11pt text-gray-700 l:flex-row l:gap-16 l:text-9pt d:gap-12">
            {NAVIGATION.map((section) => {
              return (
                <div key={section.title} className="space-y-2">
                  <div className="font-extrabold uppercase tracking-wider text-black">
                    {section.title}
                  </div>
                  {section.links[0].icon ? (
                    <div className="inline-flex items-center gap-1.5 text-black">
                      {section.links.map((link) => {
                        return (
                          <ExternalLink
                            key={link.title}
                            to={link.url}
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full border-sm border-black bg-white shadow-solid-sm focus:ring-2 focus:ring-purple focus:ring-offset-2"
                          >
                            <Social icon={link.icon} className="relative h-4 w-auto" />
                          </ExternalLink>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {section.links.map((link) => {
                        return link.url ? (
                          <ExternalLink
                            key={link.title}
                            to={link.url}
                            className="block rounded-full transition duration-300 ease-in-out hover:text-purple focus:ring-2 focus:ring-purple focus:ring-offset-2"
                          >
                            {link.title}
                          </ExternalLink>
                        ) : (
                          <div
                            key={link.title}
                            className="inline-flex cursor-not-allowed items-center gap-1"
                          >
                            <span className="text-gray-400">{link.title}</span>
                            <span className="relative -top-px inline-block rounded-full bg-black px-1 pt-0.5 text-6pt font-extrabold uppercase tracking-wider text-white">
                              Soon
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <Credits mode="pageCurl" className="w-full [@media(min-width:1024px)]:w-auto" />
      </footer>
      <img
        src="/minnie.png"
        alt="Minnie"
        className="absolute bottom-12 right-0 h-auto w-1/2 translate-x-1/3 translate-y-1/3 -rotate-[22deg] object-contain grayscale l:bottom-0"
      />
    </>
  );
};

const CURRENT_YEAR = new Date().getFullYear();

const NAVIGATION = [
  {
    title: 'Main courses',
    links: [
      { title: 'smol Node.js SDK', url: 'https://www.npmjs.com/package/smolai' },
      { title: 'smol Python SDK', url: 'https://pypi.org/project/smolai/' },
      { title: 'smol Discord', url: 'https://smol.ai/friends' },
    ],
  },
  {
    title: 'Side dishes',
    links: [
      { title: 'smol godmode', url: 'https://github.com/smol-ai/godmode' },
      { title: 'smol developer', url: 'https://github.com/smol-ai/developer' },
      { title: 'smol logger', url: 'https://github.com/smol-ai/logger' },
      { title: 'smol talk', url: false },
    ],
  },
  {
    title: 'Hors d’oeuvres',
    links: [
      { title: 'smol haus', url: 'https://smol.ai/haus' },
      { title: 'smol party', url: 'https://partiful.com/e/fkOmEIc8PmdFT8ueLtyD' },
      { title: 'smol potatoes', url: false },
    ],
  },
  {
    title: 'Entremets',
    links: [
      { title: 'smol GitHub', url: 'https://github.com/smol-ai', icon: 'github' },
      { title: 'smol Twitter', url: 'https://twitter.com/smolmodels', icon: 'twitter' },
    ],
  },
];
