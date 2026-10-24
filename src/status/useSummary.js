import { useEffect, useState } from 'react';
import { fetchSummary } from './api.js';

/** Loads the status summary and refreshes it every `refreshMs` (0 = once). */
export function useSummary(refreshMs = 0) {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  useEffect(() => {
    let active = true;
    const load = () =>
      fetchSummary().then(
        (data) => active && setState({ data, error: null, loading: false }),
        (error) => active && setState((prev) => ({ data: prev.data, error, loading: false }))
      );
    load();
    const timer = refreshMs ? setInterval(load, refreshMs) : null;
    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, [refreshMs]);

  return state;
}
