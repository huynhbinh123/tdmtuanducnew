<template>
  <UModal fullscreen title=" Vinawebapp.com">

    <template #body>
      <div class="h-full bg-black w-full overflow-y-auto flex items-center justify-center ">
        <NuxtImg loading="lazy" decoding="auto" :src="$storage(url)" width="500" class=" lg:max-w-[500px] w-full h-auto"
          alt="vinawebapp.com" />
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
defineProps({
  url: String
})
</script>

<style></style>