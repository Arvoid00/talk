import { Button } from '~/components/button';
import { Headline, Body } from '~/components/system';

export const Actions = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 !pt-0 l:p-16 d:p-32 d:pb-16">
      <div className="text-center">
        <Headline className="px-8 t:px-0">{ACTIONS_HEADLINE}</Headline>
        <Body size="sm" className="mt-2">
          {ACTIONS_BODY}
        </Body>
        <div className="mt-8">
          <Button to="https://buttondown.email/swyx" variant="yellow" size="lg">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

const ACTIONS_HEADLINE = `Small model enjoyers delight!`;

const ACTIONS_BODY = `For we are waitlist disrespecters. Join today for immediate access as a founding supporter.`;
