import { useEffect, useState } from 'react';
import { fetchEvents } from './api.js';

/** Loads maintenance or incidents for a month range ("YYYY-MM"). */
export function useEvents(kind, from, to) {
  const [state, setState] = useState({ key: '', items: [], error: null });
  const key = `${kind}:${from}:${to}`;

  useEffect(() => {
    let active = true;
    fetchEvents(kind, from, to).then(
      (items) => active && setState({ key, items, error: null }),
      (error) => active && setState({ key, items: [], error })
    );
    return () => {
      active = false;
    };
  }, [kind, from, to, key]);

  return { items: state.items, error: state.error, loading: state.key !== key };
}
