'use client';

import { Accordion } from '~/components/accordion';

export const FAQs = () => {
  return (
    <section id="faqs" className="p-8 l:p-16 l:!pt-0 d:p-32">
      <div className="mx-auto w-full max-w-md">
        <Accordion>
          {FREQUENTLY_ASKED_QUESTIONS.map(({ question, answer }) => (
            <Accordion.Item key={question} value={question}>
              <Accordion.Button>{question}</Accordion.Button>
              <Accordion.Content>{answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'What is smol.ai?',
    answer:
      'smol.ai is the AI Gateway for AI Engineers, arising from work on leading AI open source projects like smol developer (prompt-to-app codegen agent), GodMode (AI Chat Browser), and smol talk (unreleased developer chat app), that exposes small but powerful cloud primitives for the emerging AI Engineer. “smol” encapsulates our mission, vision, values, and team ethos.',
  },
  {
    question: 'Are you production-ready?',
    answer:
      'No, not yet - we are still in alpha and will break APIs frequently (with good prior communication). We are best fit for new hackers and design partners with active finetuning and AI Engineer backend issues. If that fits you, book a design partner call to chat.',
  },
  {
    question: 'What is the status of the other smol projects?',
    answer:
      'smol-developer and GodMode are side projects for research purposes and aren’t being updated actively, but are still in regular usage by us and in the community. We will do periodic updates as we see fit but they are not core products of the company.',
  },
];
