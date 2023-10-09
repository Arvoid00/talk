import { Providers } from '~/components/providers';
import { Scripts } from '~/components/scripts';

import '../styles/index.css';

export default function App({ children }) {
  return (
    <html lang="en-US">
      <body>
        <Providers>{children}</Providers>
        <Scripts />
      </body>
    </html>
  );
}

/** @type {import("next").Metadata} */
export const metadata = {
  title: 'smol.ai',
  description: '[IN PRIVATE ALPHA] The continuous finetuning platform for AI engineers!',
  robots: { noarchive: true },
  openGraph: {
    locale: 'en_US',
    siteName: 'smol',
    title: 'smol.ai',
    description: '[IN PRIVATE ALPHA] The continuous finetuning platform for AI engineers!',
    type: 'website',
    images: {
      url: '/preview.png',
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
  authors: '/humans.txt',
  icons: '/favicon.svg',
  metadataBase: 'https://smol.ai',
};
