import { useEffect } from 'react';

export const checkBackOrForward = (
  onBackForward: (direction: 'back' | 'forward' | 'unknown') => void
) => {
  useEffect(() => {
    if (!window.navigation) {
      console.warn('Navigation API is not supported in this browser.');
      return;
    }

    const handleNavigate = (event: NavigateEvent) => {

      if (event.navigationType === 'traverse') {
        const currentEntry = window.navigation.currentEntry;
        const destinationEntry = event.destination;

        if (currentEntry && destinationEntry) {
          if (destinationEntry.index < currentEntry.index) {
            onBackForward('back');

            if (event.cancelable) {
              event.preventDefault()
            } 

          } else if (destinationEntry.index > currentEntry.index) {
            onBackForward('forward');

            if (event.cancelable) {
              event.preventDefault()
            } 

          }
        } else {
          onBackForward('unknown');
        }
      }
    };

    window.navigation.addEventListener('navigate', handleNavigate);
    return () => {
      window.navigation.removeEventListener('navigate', handleNavigate);
    };
  }, [onBackForward]);
};
