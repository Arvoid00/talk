import { Page } from '~/components/page';
import { Hero } from '~/components/hero';
import { Benefits } from '~/components/benefits';
import { Features } from '~/components/features';
import { Studies } from '~/components/studies';
import { Actions } from '~/components/actions';
import { FAQs } from '~/components/faqs';
import { Note } from '~/components/note';

export default function HomePage() {
  return (
    <Page>
      <Hero />
      <Benefits />
      <Features />
      <Studies />
      <Actions />
      <FAQs />
      <Note />
    </Page>
  );
}

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'smol.ai - [IN PRIVATE ALPHA] the finetuning platform for AI engineers',
};
