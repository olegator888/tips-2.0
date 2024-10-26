import { useEffect } from "react";

interface Props {
  handleResize: () => void;
}

export const useViewportResize = (props: Props) => {
  const { handleResize } = props;

  useEffect(() => {
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
};
