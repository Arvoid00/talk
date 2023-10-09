import { Avatar } from '~/components/avatar';
import { Brand } from '~/components/brand';
import { Card, Subheadline } from '~/components/system';
import { cx } from '~/utils';

export const Studies = () => {
  return <div className="h-32" />;

  // @TODO restore
  // return (
  //   <section id="studies" className="relative flex gap-16 p-32 !pt-0">
  //     {TESTIMONIALS.map((testimonial) => (
  //       <Testimonial key={testimonial.slug} testimonial={testimonial} />
  //     ))}
  //   </section>
  // );
};

const Testimonial = ({ testimonial }) => {
  const { quote, name, title, handle, variant } = testimonial;

  return (
    <Card variant={variant} className="relative overflow-hidden !p-8">
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-white/90 to-white" />
      <div className="relative z-10">
        <Brand icon="dagster" className="h-8 w-auto" />
        <Subheadline size="sm" className="mt-4 leading-normal">
          <q>{quote}</q>
        </Subheadline>
        <div className="mt-4 flex items-center gap-4">
          <Avatar src="https://pbs.twimg.com/profile_images/1526250708340822018/VG199ELt_400x400.jpg" />
          <div>
            <div className="text-12pt">{name}</div>
            <div className="mt-0.5 text-8pt font-extrabold uppercase tracking-wider">{title}</div>
            <div className={cx(accentColors[variant], 'mt-1 font-source-code text-8pt')}>
              {handle}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const TESTIMONIALS = [
  {
    slug: 'dagster',
    variant: 'magenta',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dignissimos alias harum illo doloribus, amet, accusantium at consequatur.',
    name: 'Pete Floyd',
    title: 'CEO of Dagster',
    handle: '@floydophone',
  },
  {
    slug: 'dagster2',
    variant: 'cyan',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dignissimos alias harum illo doloribus, amet, accusantium at consequatur.',
    name: 'Pete Floyd',
    title: 'CEO of Dagster',
    handle: '@floydophone',
  },
  {
    slug: 'dagster3',
    variant: 'purple',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dignissimos alias harum illo doloribus, amet, accusantium at consequatur.',
    name: 'Pete Floyd',
    title: 'CEO of Dagster',
    handle: '@floydophone',
  },
];

const accentColors = {
  magenta: 'text-magenta-900',
  cyan: 'text-cyan-900',
  purple: 'text-purple-900',
};
