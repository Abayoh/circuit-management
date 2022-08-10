import React, { useState } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlocker(blocker, when = true) {
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
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export default function usePrompt(prompt, when = true) {
  const [location, setLocation] = useState(null);
  let canNavigate = false;

  const setCanNavigate = (nav) => {
    canNavigate = nav;
  };

  const blocker = (tx) => {
    if (!location) {
      setLocation(tx.location);
      prompt();
    } else {
      if (canNavigate) tx.retry();
      setLocation(null);
    }
  };
  useBlocker(blocker, when);
  return { location, setCanNavigate };
}
