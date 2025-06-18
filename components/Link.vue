<template>
 <NuxtLinkLocale :to="link">
  <slot />
 </NuxtLinkLocale>
</template>

<script setup>

const localeLink = useCookie('localeLink');
localeLink.value = localeLink.value || '';

const props = defineProps({
 to: {
  type: String,
  default: '/'
 }
})

const link = ref('/');
if (localeLink.value.length > 0) {
 link.value = '/' + localeLink.value + '/' + props.to;
} else {
 link.value = '/' + props.to;

}
</script>

<style></style>