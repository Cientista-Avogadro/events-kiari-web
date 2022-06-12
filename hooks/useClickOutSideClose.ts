import { useEffect } from 'react';

export const useClickOutSideClose = (
  ref: React.MutableRefObject<any>,
  handleRef: (event: Event) => any
) => {
  {
    useEffect(() => {
      const listener = (event: Event) => {
        const el = ref?.current;

        if (!el || el.contains(event.target)) {
          return;
        }

        handleRef(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handleRef]);
  }
};
