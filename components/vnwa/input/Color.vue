<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
        default: '#00C16A'
    },
    label: {
        type: String,
        default: 'Choose color'
    }
})
const color = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])
watch(color, (newValue) => {
    emit('update:modelValue', newValue)
})
const chip = computed(() => ({ backgroundColor: color.value }))
</script>

<template>
    <UPopover>
        <UButton :label="label" color="neutral" variant="outline">
            <template #leading>
                <span :style="chip" class="size-3 rounded-full" />
            </template>
        </UButton>

        <template #content>
            <UInput  v-model="color" variant="subtle" color="info"  />
            <UColorPicker v-model="color" class="p-2" />
        </template>
    </UPopover>
</template>
