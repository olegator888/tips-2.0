import { useRef, useState } from "react";

export const useIsScrolled = <T extends Element>() => {
  const ref = useRef<T | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const onScroll = () => {
    if (!ref.current) return;
    setIsScrolled(ref.current.scrollTop > 10);
  };

  return { ref, isScrolled, onScroll };
};
