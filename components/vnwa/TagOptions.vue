<template>
    <USelectMenu v-model="tagIds" value-key="id" label-key="name" multiple :items="data" class="" />
</template>

<script lang="ts" setup>

const props = defineProps<{
    modelValue: number[] // nhận từ cha qua v-model
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number[]): void
}>()

// Biến nội bộ để reactive
const tagIds = ref<number[]>([...props.modelValue])

// Đồng bộ từ props -> nội bộ (khi cha thay đổi)
watch(
    () => props.modelValue,
    (val) => {
        if (JSON.stringify(val) !== JSON.stringify(tagIds.value)) {
            tagIds.value = [...val]
        }
    },
    { immediate: true }
)

// Đồng bộ nội bộ -> emit cho cha
watch(
    tagIds,
    (val) => {
        emit('update:modelValue', val)
    },
    { deep: true }
)

interface T {
    id: number
    name: string
}

const { locale } = useI18n()
const { data } = useHttp<T[]>('vnwa/load-data-tags')
</script>