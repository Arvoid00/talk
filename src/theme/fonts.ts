// NOTE: Every string passed to `next/font` functions *cannot*
// be dynamic! This eslint rule is disabled to prevent eslint --fix
// from automatically changing "" or '' strings to backick (``) strings
//
// Additionally, imports from `next/font/google` *cannot* be aliased with
// `as` (ex: `Poppins as display`). This causes Storybook to throw a
// separate error! Normally we would need to do something akin to this
// because of the eslint rules `new-cap` and `camelcase`, which also must
// be disabled here
/* eslint-disable new-cap, camelcase, @typescript-eslint/quotes */
import { Poppins, Nunito_Sans, Nunito } from "next/font/google";
import localFont from "next/font/local";

export const display = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
  variable: "--font-display"
});

export const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body"
});

export const code = localFont({
  src: [
    {
      path: "../../public/fonts/Mona-Sans-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../public/fonts/Mona-Sans-RegularItalic.woff2",
      weight: "400",
      style: "italic"
    },
    {
      path: "../../public/fonts/Mona-Sans-Bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../../public/fonts/Mona-Sans-BoldItalic.woff2",
      weight: "700",
      style: "italic"
    }
  ],
  variable: "--font-code"
});

export const input = Nunito({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-input"
});
