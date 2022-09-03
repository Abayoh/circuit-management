import React, { useState } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlocker(retryNavigation, when = true) {
  const { navigator } = React.useContext(NavigationContext);

  React.useEffect(() => {
    
    if (!when) return;
    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      retryNavigation(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, retryNavigation, when]);
}

export default function usePrompt(prompt, when = true) {
  const [location, setLocation] = useState(null);
  let canNavigate = false;

  const setCanNavigate = (nav) => {
    canNavigate = nav;
  };

  const retryNavigation = (tx) => {
    if (!location) {
      setLocation(tx.location);
      prompt();
    } else {
      if (canNavigate) tx.retry(); //if the user agrees to to navigate
      setLocation(null);
    }
  };

  
  useBlocker(retryNavigation, when);
  return { location, setCanNavigate };
}
