'use client';

import { ExternalLink } from '~/components/external-link';
import { Logo } from '~/components/logo';

export default function OpenGraphPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="flex h-[630px] w-[1200px] flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center gap-6">
          <Logo className="relative z-0 w-gr-lg" />
          <ExternalLink
            to="https://vercel.com/blog/ai-accelerator-participants"
            className="inline-flex items-center gap-6"
          >
            <img src="/vercel-ai.png" className="h-8 w-auto" alt="" />
            <div>
              <div className="mt-1 text-8pt uppercase tracking-wider text-gray-500">Backed by</div>
              <div className="mt-1 text-14pt font-bold">Vercel AI Accelerator</div>
            </div>
          </ExternalLink>
        </div>
        {/* <Headline size="xs" className="mt-8 text-center l:whitespace-nowrap">
          [IN PRIVATE ALPHA] The continuous finetuning platform for{' '}
          <ExternalLink to="https://www.latent.space/p/ai-engineer">AI engineers</ExternalLink>!
        </Headline> */}
      </div>
    </div>
  );
}
