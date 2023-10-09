'use client';

import { useSetAtom } from 'jotai';

import { subscribeModalAtom } from '~/atoms';
import { Avatar } from '~/components/avatar';
import { Button } from '~/components/button';
import { ExternalLink } from '~/components/external-link';
import { Icon } from '~/components/icon';
import { Headline, Body, Card } from '~/components/system';

export const Note = () => {
  const setIsSubscribeModalOpen = useSetAtom(subscribeModalAtom);

  return (
    <section
      id="founders-note"
      className="flex flex-col gap-8 p-8 pb-16 l:flex-row l:gap-16 l:px-32"
    >
      <Card className="relative overflow-hidden !p-8 l:w-1/2 d:w-[34%]">
        <div>
          <Headline size="sm">{FOUNDERS_NOTE_HEADLINE}</Headline>
          <Body size="xs" className="mt-2">
            {FOUNDERS_NOTE_BODY}
          </Body>
        </div>
        <ExternalLink to="https://twitter.com/swyx" className="mt-4 flex items-center gap-4">
          <div className="shrink-0">
            <Avatar src="https://user-images.githubusercontent.com/6764957/166125711-7dd63d46-3405-4c66-a6bd-92a34dbf58f6.png" />
          </div>
          <div className="shrink-0">
            <div className="text-12pt">Shawn Wang</div>
            <div className="mt-0.5 text-8pt font-extrabold uppercase tracking-wider">
              CEO of Smol AI
            </div>
            <div className="mt-1 font-source-code text-8pt text-gray-700">@swyx</div>
          </div>
        </ExternalLink>
      </Card>
      <Card className="relative overflow-hidden !p-8 l:w-1/2 d:w-[29%]">
        <div>
          <Headline size="sm">{NEWSLETTER_HEADLINE}</Headline>
          <Body size="xs" className="mt-2">
            {NEWSLETTER_BODY}
          </Body>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <Icon icon="mailbox" className="h-12 w-auto l:h-16" />
            </div>
            <div className="l:hidden">
              <Button to="https://www.latent.space/embed" size="sm" variant="yellow" icon="mailbox">
                Subscribe
              </Button>
            </div>
            <div className="hidden l:block">
              <Button
                onClick={() => setIsSubscribeModalOpen(true)}
                size="md"
                variant="yellow"
                icon="mailbox"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

const FOUNDERS_NOTE_HEADLINE = `A word from swyx`;

const FOUNDERS_NOTE_BODY = `I am delighted by your interest and have been actively researching the AI Engineer landscape to build the platform I think serves the community best. smol.ai is under active development and we hope you will forgive our humble beginnings.`;

const NEWSLETTER_HEADLINE = `Keep up with smol`;

const NEWSLETTER_BODY = `Sign up for the Latent Space newsletter which will bring news and updates on the entire AI Engineering space through our lens.`;
