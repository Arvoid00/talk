import Script from 'next/script';

export const Scripts = () => {
  return (
    <>
      <Script
        id="fathom-analytics"
        strategy="afterInteractive"
        src="https://cdn.usefathom.com/script.js"
        data-site="YQDESWXG"
        defer={true}
      />
    </>
  );
};
