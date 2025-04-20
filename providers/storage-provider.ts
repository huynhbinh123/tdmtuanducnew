import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'


export const getImage: ProviderGetImage = (
  src,
  { baseURL } = {}
) => {
  if (!baseURL) {
    baseURL = useRuntimeConfig().public.storageBase
  }

  if (src.startsWith('http://') || src.startsWith('https://')) {
    return { url: src }
  }



  return {
    url: joinURL(baseURL, src)
  }
}
