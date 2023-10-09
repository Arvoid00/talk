'use client';

import { useAtom, useAtomValue } from 'jotai';

import { languageAtom, featureAtom } from '~/atoms';
import { Code } from '~/components/code';
import { Headline, Subheadline, Body, Card } from '~/components/system';
import { cx } from '~/utils';

export const Features = () => {
  const selectedLanguage = useAtomValue(languageAtom);
  const [selectedFeature, setSelectedFeature] = useAtom(featureAtom);

  return (
    <section
      id="features"
      className="relative flex flex-col gap-8 p-8 !pt-0 l:flex-row l:gap-16 l:p-16 d:gap-32 d:p-32"
    >
      <Card className="flex w-full flex-col gap-8 l:flex-row l:gap-16">
        <Card
          variant="gray"
          className="order-last -mx-4 -mb-4 !p-4 l:order-first l:mx-0 l:aspect-video l:w-1/2 l:max-w-full l:!p-8 d:-m-4 d:!p-12"
        >
          <div className="">
            <Code language="js">{CODE_SNIPPETS[selectedFeature]['node']}</Code>
          </div>
        </Card>
        <div className="l:w-1/2">
          <Headline>{FEATURES_HEADLINE}</Headline>
          <Body size="sm" className="mt-4">
            {FEATURES_BODY}
          </Body>
          <div className="mt-8 flex flex-col gap-4">
            {FEATURES.map((feature) => (
              <button
                key={feature.slug}
                onClick={() => setSelectedFeature(feature.slug)}
                className={cx(
                  feature.slug === selectedFeature
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-black',
                  'rounded-lg border-sm border-black p-4 pb-3 shadow-solid-sm focus:ring-2 focus:ring-purple focus:ring-offset-2',
                )}
              >
                <Subheadline>{feature.title}</Subheadline>
                {feature.slug === selectedFeature && (
                  <Body size="sm" className="mt-1 !text-gray-400">
                    {feature.description}
                  </Body>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};

const FEATURES_HEADLINE = `How does it work?`;

const FEATURES_BODY = ``;

const FEATURES = [
  {
    slug: 'rate-limiting',
    title: 'Rate limiting',
    description:
      'All requests are semantically limited at the edge, offering cost savings and abuse protection at single digit millisecond latency.',
  },
  {
    slug: 'semantic-caching',
    title: 'Semantic caching',
    description:
      'All requests are semantically limited at the edge, offering cost savings and abuse protection at single digit millisecond latency.',
  },
  {
    slug: 'finetuned-models',
    title: 'Finetuned models',
    description: '',
    icon: 'layers',
  },
  {
    slug: 'long-memory',
    title: 'Long memory',
    description: 'Automated hashing and storage of data in vector database for retrieval.',
  },
];

const CODE_SNIPPETS = {
  'rate-limiting': {
    node: `import SmolAI from 'smolai';

const smolai = new SmolAI({
	smolRateLimit: { count: 10, per: '10s' }
});

export default async (req) => {
  const chatCompletion = await smolai
    .chat
    .completions
    .create({
      messages: [{
        role: 'user',
        content: req.body.text
      }],
      model: 'gpt-3.5-turbo',
    });

  return new Response(
    chatCompletion.choices[0].content
  );
};
    `,
    python: `Python rate-limiting`,
  },
  'semantic-caching': {
    node: `import SmolAI from 'smolai';

const smolai = new SmolAI({
	smolCache: { similarityThreshold: 0.8 }
});

export default async (req) => {
  const chatCompletion = await smolai
    .chat
    .completions
    .create({
      messages: [{
        role: 'user',
        content: req.body.text
      }],
      model: 'gpt-3.5-turbo',
    });

  return new Response(
    chatCompletion.choices[0].content
  );
};`,
    python: `Python semantic-caching`,
  },
  'finetuned-models': {
    node: `const openai = new OpenAI();

const smol = new SmolAI({
	base: openai,
	baseModel: 'gpt-4-32k',
	finetuneName: 'summarizer-20231010',
	smolKey: 'xxxx-xxxx-xxxx-xxxx'
});

export default async (req) => {
	const chatBot = new smol.AI(
      "You are a helpful chatbot"
    )

	const reply = await chatBot.send([req.body])

  return new Response(reply);
};`,
    python: `Python finetuned-models`,
  },
  'long-memory': {
    node: `// Coming soon!`,
    python: `Python long-memory`,
  },
};
