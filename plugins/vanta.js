import { defineNuxtPlugin } from '#app'
import * as THREE from 'three'
import HALO from 'vanta/dist/vanta.halo.min.js'
import FOG from 'vanta/dist/vanta.fog.min.js'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('vanta', {
    halo: (options, el) => {
      if (process.client) {
        return HALO({ THREE, el, ...options })
      }
    },
    fog: (options, el) => {
     if (process.client) {
       return FOG({ THREE, el, ...options })
     }
   }
  })
})