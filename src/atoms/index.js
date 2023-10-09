import { atom } from 'jotai';

export const loadingAtom = atom(true);

export const languageAtom = atom('node');

export const featureAtom = atom('rate-limiting');

export const subscribeModalAtom = atom(false);
