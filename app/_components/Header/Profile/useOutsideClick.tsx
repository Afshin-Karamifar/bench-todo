import { LegacyRef, MutableRefObject, useEffect } from "react";

function useOutsideClick(ref: MutableRefObject<null | HTMLElement>, callback: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !((ref.current as HTMLElement).contains(event.target as Node))) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useOutsideClick;
