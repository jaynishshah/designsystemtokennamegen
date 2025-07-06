import { AppState, Bucket } from '../types';

export const encodeStateToUrl = (state: AppState): string => {
  const params = new URLSearchParams();
  params.set('tokenType', state.tokenType);
  params.set('delimiter', state.delimiter);
  params.set('buckets', JSON.stringify(state.buckets));
  return `${window.location.pathname}?${params.toString()}`;
};

export const decodeStateFromUrl = (): AppState | null => {
  const params = new URLSearchParams(window.location.search);
  const tokenType = params.get('tokenType');
  const delimiter = params.get('delimiter');
  const bucketsParam = params.get('buckets');
  
  if (!tokenType || !delimiter || !bucketsParam) return null;
  
  try {
    const buckets: Bucket[] = JSON.parse(bucketsParam);
    return { tokenType, delimiter, buckets };
  } catch {
    return null;
  }
};

export const getDefaultState = (): AppState => ({
  tokenType: 'color',
  delimiter: '-',
  buckets: [
    { id: '1', name: 'context', values: ['button', 'input', 'card'] },
    { id: '2', name: 'scope', values: ['primary', 'secondary', 'danger'] },
    { id: '3', name: 'modifier', values: ['hover', 'active', 'disabled'] }
  ]
});