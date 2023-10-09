'use client';

import { useAtom } from 'jotai';

import { languageAtom } from '~/atoms';
import { Icon } from '~/components/icon';
import { Logo } from '~/components/logo';
import { Package } from '~/components/package';
import { Headline, Subheadline, Body, Card } from '~/components/system';
import { cx } from '~/utils';

export const Benefits = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(languageAtom);

  return (
    <section
      id="benefits"
      className="relative flex min-h-screen flex-col gap-8 p-8 l:flex-row l:gap-16 l:p-16 d:p-32"
    >
      <div className="l:w-1/2">
        <Card className="l:sticky l:top-16 d:top-32">
          <div className="w-full max-w-xl">
            <div>
              <Headline className="l:whitespace-nowrap">{BENEFITS_HEADLINE}</Headline>
              <Body size="sm" className="mt-4">
                {BENEFITS_BODY}
              </Body>
              <div className="mt-8 flex items-center gap-4 l:-mb-4">
                <Card
                  variant="gray"
                  className="z-0 w-full shrink-0 space-y-4 whitespace-nowrap !bg-gray-100 !p-4 d:w-auto"
                >
                  {STEPS.map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border-sm border-black !bg-white font-black shadow-solid-sm">
                        <span className="relative left-px top-px">{String(index + 1)}</span>
                      </div>
                      <div>{step}</div>
                    </div>
                  ))}
                </Card>
                <img
                  src="/minnie.png"
                  alt="Minnie"
                  className="relative -right-4 hidden h-full w-1/2 object-contain d:block"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-8 pb-8 l:w-1/2 l:gap-16">
        <Card variant="gray">
          <Subheadline>{STEP_1_HEADLINE}</Subheadline>
          <Body size="xs" className="mt-1.5">
            {STEP_1_BODY}
          </Body>
          <div className="mt-4 flex gap-4">
            {LANGUAGES.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={cx(
                  selectedLanguage === language ? 'bg-gray-900' : 'bg-gray-100',
                  'inline-flex flex-1 items-center justify-center rounded-lg border-sm border-black p-4 py-3 shadow-solid-sm focus:ring-2 focus:ring-purple focus:ring-offset-2',
                )}
              >
                <Package
                  icon={language}
                  className={cx(selectedLanguage === language && 'invert', 'h-6 w-auto')}
                />
              </button>
            ))}
          </div>
          <div className="mt-4">
            <div className="rounded-lg border-sm border-black bg-white p-4 py-3 font-source-code shadow-solid-sm">
              <span className="select-none text-gray-500">$ </span>
              <span>{CODE_SNIPPETS[selectedLanguage].install}</span>
            </div>
          </div>
        </Card>
        <Card variant="gray">
          <Subheadline>{STEP_2_HEADLINE}</Subheadline>
          <Body size="xs" className="mt-1.5">
            {STEP_2_BODY}
          </Body>
          <div className="mt-4">
            <div className="space-y-1.5 overflow-hidden whitespace-nowrap rounded-lg border-sm border-black bg-white p-4 py-3 font-source-code text-8pt shadow-solid-sm">
              <div>
                <span className="select-none bg-[red] bg-opacity-10 text-gray-500">1.</span>
                <span className="select-none"> </span>
                <span>
                  {CODE_SNIPPETS[selectedLanguage].importStart}
                  {CODE_SNIPPETS[selectedLanguage].originNamedImport && (
                    <span className="bg-[red] bg-opacity-10">
                      {CODE_SNIPPETS[selectedLanguage].originNamedImport}
                    </span>
                  )}
                  {CODE_SNIPPETS[selectedLanguage].importMiddle}
                  <span className="bg-[red] bg-opacity-10">
                    {CODE_SNIPPETS[selectedLanguage].originPackage}
                  </span>
                  {CODE_SNIPPETS[selectedLanguage].importEnd}
                </span>
              </div>
              <div>
                <span className="select-none bg-[green] bg-opacity-10 text-gray-500">1.</span>
                <span className="select-none"> </span>
                <span>
                  {CODE_SNIPPETS[selectedLanguage].importStart}
                  {CODE_SNIPPETS[selectedLanguage].destinationNamedImport && (
                    <span className="bg-[green] bg-opacity-10">
                      {CODE_SNIPPETS[selectedLanguage].destinationNamedImport}
                    </span>
                  )}
                  {CODE_SNIPPETS[selectedLanguage].importMiddle}
                  <span className="bg-[green] bg-opacity-10">
                    {CODE_SNIPPETS[selectedLanguage].destinationPackage}
                  </span>
                  {CODE_SNIPPETS[selectedLanguage].importEnd}
                </span>
              </div>
            </div>
          </div>
        </Card>
        {BENEFITS.map((benefit) => (
          <Benefit key={benefit.title} benefit={benefit} />
        ))}
      </div>
    </section>
  );
};

const Benefit = ({ benefit }) => {
  const { variant, icon, title, description, className } = benefit;

  return (
    <Card
      variant={variant}
      className={cx(
        'mb-4 flex items-center l:sticky l:top-16 l:mb-0 l:aspect-wide d:top-32',
        className,
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-8">
          <Icon icon={icon} className="relative -bottom-1 h-16 w-auto t:h-20" />
          <div className="flex flex-col items-center gap-2">
            <Logo className="h-12 w-auto t:h-16" />
            <Subheadline size={title.length < 10 ? 'lg' : 'sm'} className="uppercase">
              is {title}
            </Subheadline>
          </div>
        </div>
        <Body size={description.length < 100 ? 'lg' : 'md'} className="mt-4 !text-black/80">
          {description}
        </Body>
      </div>
    </Card>
  );
};

const BENEFITS_HEADLINE = `From static to continuous`;

const BENEFITS_BODY = `AI Engineers reinvent wheels because the large AGI labs stop at serving LLMs via API. Quickly swap in our OpenAI-superset SDK to gain immediate developer experience improvements. Then easily to switch to smaller models for even more benefits.`;

const STEPS = ['Install the SDK', 'Plug in your model', 'Continously improve'];

const STEP_1_HEADLINE = `Select your language`;

const STEP_1_BODY = `smol maintains official open source OpenAI-superset Nodejs and Python SDKs. Open to community maintained SDKs in other languages.`;

const STEP_2_HEADLINE = `Change one line`;

const STEP_2_BODY = `Any OpenAI-compatible API will work!`;

const LANGUAGES = ['node', 'python'];

const CODE_SNIPPETS = {
  node: {
    install: `npm i smolai`,
    originPackage: 'openai',
    destinationPackage: 'smolai',
    originNamedImport: `OpenAI`,
    destinationNamedImport: `SmolAI`,
    importStart: `import `,
    importMiddle: ` from '`,
    importEnd: `';`,
  },
  python: {
    install: `pip install smolai`,
    originPackage: 'openai',
    destinationPackage: 'smolai',
    originImport: ``,
    destinationNamedImport: ``,
    importStart: `import `,
    importMiddle: ``,
    importEnd: ``,
  },
};

const BENEFITS = [
  {
    variant: 'magenta',
    className: '-rotate-3 l:-rotate-6',
    title: 'fast',
    description:
      'Finetuned GPT-3.5 models are 4-10x faster than GPT-4. Finetuned CodeLlama-34B models can beat GPT-4. Fewer parameters, less mmults, better performance, for a specific usecase.',
    icon: 'speed',
  },
  {
    variant: 'cyan',
    className: 'rotate-3 l:rotate-6',
    title: 'continuous',
    description:
      'Why must AI have a knowledge cutoff? Why aren’t more AI Engineers constantly finetuning their models? Because it’s hard? Not anymore.',
    icon: 'loop',
  },
  {
    variant: 'purple',
    className: '-rotate-3 l:-rotate-1',
    title: 'safe',
    description:
      'No SuperCrazyUltraMax AGI here. Domain specific language models offer fewer hallucinations.',
    icon: 'protect',
  },
];
