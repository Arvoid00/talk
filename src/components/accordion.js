'use client';

import { Accordion as Component } from '@candycode/core/accordion';
import { Rotate } from '@candycode/core/elements';

import { ClientOnly } from '~/components/client-only';
import { Icon } from '~/components/icon';
import { Subheadline, Body } from '~/components/system';

export const Accordion = (props) => {
  return (
    <ClientOnly>
      <Component
        className="divide-gray-2300 space-y-4 divide-y"
        transition={{ type: 'spring', duration: 1 }}
        {...props}
      />
    </ClientOnly>
  );
};

const CustomButton = ({ children, ...rest }) => {
  return (
    <Component.Button
      className="group mt-4 flex w-full items-center justify-between rounded-full text-black hover:text-magenta focus:ring-2 focus:ring-purple focus:ring-offset-2"
      {...rest}
    >
      {({ isOpen }) => (
        <>
          <Subheadline
            size="sm"
            className="inline-block grow pr-4 leading-tight transition duration-300 ease-in-out group-hover:text-purple"
          >
            {children}
          </Subheadline>
          <Rotate
            value={isOpen}
            rotation={{ direction: 'clockwise', degrees: 90 }}
            transition={{ type: 'spring', duration: 1.2, bounce: 0.6 }}
          >
            <Icon icon="arrow" className="h-5 w-auto text-black" />
          </Rotate>
        </>
      )}
    </Component.Button>
  );
};

const CustomContent = ({ children, ...rest }) => {
  return (
    <Component.Content transition={{ duration: 1 }} {...rest}>
      <Body size="xs" className="mt-2">
        {children}
      </Body>
    </Component.Content>
  );
};

Accordion.Item = Component.Item;
Accordion.Button = CustomButton;
Accordion.Content = CustomContent;
