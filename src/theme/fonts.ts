import { Poppins as display, Nunito_Sans as body, Nunito as input } from "next/font/google";
import localFont from 'next/font/local'

export const fontDisplay = display({
  subsets: [`latin`],
  weight: [`200`, `400`, `600`],
  variable: `--font-display`
});

export const fontBody = body({
  subsets: [`latin`],
  weight: [`400`, `600`],
  variable: `--font-body`
});

export const fontCode = localFont({
  src: [
    {
      path: `../../public/fonts/Mona-Sans-Regular.woff2`,
      weight: `400`,
      style: `normal`
    },
    {
      path: `../../public/fonts/Mona-Sans-RegularItalic.woff2`,
      weight: `400`,
      style: `italic`
    },
    {
      path: `../../public/fonts/Mona-Sans-Bold.woff2`,
      weight: `700`,
      style: `normal`
    },
    {
      path: `../../public/fonts/Mona-Sans-BoldItalic.woff2`,
      weight: `700`,
      style: `italic`
    }
  ],
  variable: `--font-code`
})

export const fontInput = input({
  subsets: [`latin`],
  weight: [`300`, `400`],
  variable: `--font-input`
});
