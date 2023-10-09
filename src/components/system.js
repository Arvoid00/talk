import { cx } from '~/utils';

export const Card = ({ variant = 'white', className = '', children, ...rest }) => {
  return (
    <div
      className={cx(
        cardVariants[variant],
        'rounded-3xl border-sm border-black p-8 shadow-solid l:p-12 d:p-16',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const cardVariants = {
  white: 'bg-white text-black',
  gray: 'bg-gray-200 text-black',
  cyan: 'bg-cyan-500 text-black',
  yellow: 'bg-yellow-500 text-black',
  magenta: 'bg-magenta-500 text-black',
  purple: 'bg-purple-500 text-black',
};

export const Headline = ({ as = 'h3', size = 'md', className = '', children, ...rest }) => {
  const Component = as;

  return (
    <Component
      className={cx(headlineSizes[size], 'font-hobeaux font-semibold', className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

const headlineSizes = {
  lg: 'text-32pt',
  md: 'text-24pt',
  sm: 'text-21pt',
  xs: 'text-16pt',
};

export const Subheadline = ({ size = 'md', className = '', children, ...rest }) => {
  return (
    <div className={cx(subheadlineSizes[size], 'font-apparat font-extrabold', className)} {...rest}>
      {children}
    </div>
  );
};

const subheadlineSizes = {
  lg: 'text-24pt',
  md: 'text-16pt',
  sm: 'text-12pt',
};

export const Body = ({ size = 'md', className = '', children, ...rest }) => {
  return (
    <div
      className={cx(
        bodySizes[size],
        'font-apparat font-normal leading-snug text-gray-600',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const bodySizes = {
  xl: 'text-16pt',
  lg: 'text-14pt',
  md: 'text-12pt',
  sm: 'text-10pt',
  xs: 'text-9pt',
};
