<template>
    <ul class="flex items-center justify-end gap-4">
        <li v-for="(item,index) in langs" :key="index">
            <UButton :icon="item.icon"
                :class="props.locale != item.code ? 'bg-white text-black border border-gray-400' : 'bg-sky-500 text-black border border-gray-400'"
                @click="updateLocale(item.code)">{{ item.label }}</UButton>
        </li>
    </ul>
 
</template>

<script lang="ts" setup>
const props = defineProps<{
    locale: string;
}>();
const { t } = useI18n();
const langs = [{
    code: 'vi',
    label: t('vnwa.vietnamese'),
    icon: 'flag:vn-4x3'
}, {
    code: 'en',
    label: t('vnwa.english'),
    icon: 'flag:gb-eng-4x3'

}]
const emit = defineEmits<{
    (e: 'update:locale', locale: string): void;
}>();
const updateLocale = (locale: string) => {
    emit('update:locale', locale);
};
</script>

<style></style>