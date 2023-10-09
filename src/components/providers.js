'use client';

import { createStore, Provider } from 'jotai';
import { AnimatePresence } from 'framer-motion';

import { loadingAtom, languageAtom, featureAtom, subscribeModalAtom } from '~/atoms';

const store = createStore();
store.set(loadingAtom, true);
store.set(languageAtom, 'node');
store.set(featureAtom, 'rate-limiting');
store.set(subscribeModalAtom, false);

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <AnimatePresence mode="wait" initial={true}>
        <div className="text-clip">{children}</div>
      </AnimatePresence>
    </Provider>
  );
};
