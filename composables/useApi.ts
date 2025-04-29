import type { $Fetch } from 'nitropack/types';
import type { HttpUseFetchOptions } from '~';

export function useApi<T>(
  url: string | (() => string),
  options?: HttpUseFetchOptions<T>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$http as $Fetch
  });
}