<script setup lang="ts">
import { vMaska } from 'maska/vue'

const props = defineProps({
  modelValue: String,
  modelNation: String
})

const emit = defineEmits(['update:modelValue', 'update:modelNation'])

const nations = ref<any[]>([])
const nation = ref<any>(null)

onMounted(async () => {
  nations.value = await useNations()
  nation.value = nations.value.find(n => n.value === props.modelNation) || nations.value[0]
})

watch(() => nation.value, val => {
  emit('update:modelNation', val?.value || '')
})

const phone = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <UButtonGroup class="bg-white">
    <div class="flex items-center justify-start gap-0 bg-gray-200">
      <USelectMenu
        :ui="{
          base: 'rounded-none border-0 gap-0 ring-0 bg-white text-black bg-none cursor-pointer ps-9 pe-8 bg-gray-200 h-full hover:text-white hover:bg-black',
          value: 'hidden w-0',
          content: 'w-[300px]',
          trailing: 'pe-0 end-3',
          trailingIcon: 'size-4'
        }"
        v-model="nation"
        :icon="nation?.icon"
        :items="nations"
      />
      <div class="text-black pe-3">
        <span v-if="nation" class="text-base font-bold">
          {{ nation.value }}
        </span>
      </div>
    </div>

    <UInput
      v-maska="'### ### #####'"
      v-model="phone"
      :placeholder="$t(`phone`)"
      :ui="{
        base: 'bg-white dark:bg-white rounded-none text-base ring-0 border-0 focus:ring-0 focus:border-0 text-black',
        leading: 'pointer-events-none'
      }"
    />
  </UButtonGroup>
</template>
