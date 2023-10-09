import { NextButton } from '@candycode/core/next';

import { cx } from '~/utils';

export const Button = ({ variant = 'white', size = 'sm', className = '', children, ...rest }) => {
  const buttonClassNames = cx(
    buttonVariants[variant],
    buttonSizes[size],
    'inline-flex cursor-pointer items-center justify-center rounded-full border-sm border-black font-extrabold uppercase leading-none transition duration-300 ease-in-out hover:shadow-none focus:ring-2 focus:ring-purple focus:ring-offset-2',
    className,
  );

  return (
    <NextButton className={buttonClassNames} {...rest}>
      {children}
    </NextButton>
  );
};

const buttonVariants = {
  white: 'bg-white text-black',
  gray: 'bg-gray-200 text-black',
  cyan: 'bg-cyan-500 text-black',
  magenta: 'bg-magenta-500 text-black',
  yellow: 'bg-yellow-500 text-black',
};

const buttonSizes = {
  lg: 'px-6 l:px-8 py-4 l:py-5 gap-2 l:gap-3 text-15pt l:text-20pt shadow-solid hover:translate-x-[3px] hover:translate-y-[3px] l:shadow-solid-lg l:hover:translate-x-[6px] l:hover:translate-y-[6px]',
  md: 'px-6 py-4 gap-2 text-15pt shadow-solid hover:translate-x-[3px] hover:translate-y-[3px]',
  sm: 'px-4 py-3 gap-1.5 text-10pt shadow-solid hover:translate-x-[3px] hover:translate-y-[3px]',
};
