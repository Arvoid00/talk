import { useState, useEffect } from "react";

export const useAtBottom = (offset = 0): boolean => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsAtBottom(
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - offset
      );
    };

    window.addEventListener(`scroll`, handleScroll, { passive: true });
    handleScroll();

    return (): void => {
      window.removeEventListener(`scroll`, handleScroll);
    };
  }, [offset]);

  return isAtBottom;
};
