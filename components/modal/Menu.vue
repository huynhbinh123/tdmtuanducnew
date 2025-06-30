<script lang="ts" setup>
interface T {
    icon: string;
    label: string;
    to: string;
}
const props = defineProps<{
    menu: T[],
}>()
const emit = defineEmits(['success'])
function onSuccess() {
    emit('success')
}



</script>

<template>
    <UModal :title="`Menu`">
        <template #body>
            <ul class="header-menu  space-y-3 ">
                <li class="" v-for="(item, index) in menu" :key="index">
                    <NuxtLinkLocale @click="onSuccess()" :to="item.to" aria-label="menu link">
                        <button
                            class="flex items-center justify-start gap-2 relative text-base px-3 py-2 cursor-pointer uppercase">
                            <UIcon :name="item.icon" color="white" class="size-6" /> {{ $t(item.label) }}
                        </button>
                    </NuxtLinkLocale>
                </li>
              
            </ul>
        </template>


    </UModal>
</template>
