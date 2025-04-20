<template>
    <div class="flex items-center ">
        <div class="flex items-center">
            <button @click="navigateTo('')" :class="{ 'text-gray-900 dark:text-gray-300': breadcrumbs.length <=0  }"
                class="text-gray-500 flex items-center justify-center text-xs gap-1 px-2 py-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-xs">
                <UIcon name="fa6-solid:folder" />
                <span>Home</span>
            </button>
        </div>

        <!-- Breadcrumb -->
        <div class="flex items-center  text-xs  flex-row">
            <template v-for="(item, index) in breadcrumbs" :key="index">

                <span class="mx-2 text-gray-400">/</span>

                <button class="px-2 py-1  hover:bg-black/10 dark:hover:bg-white/10  rounded-xs"
                    :class="{ 'text-gray-900 dark:text-gray-300': index === breadcrumbs.length - 1, 'cursor-pointer hover:text-white text-gray-500': index !== breadcrumbs.length - 1 }"
                    @click="navigateTo(item.path)">
                     <h5 class="inline whitespace-nowrap">
                        {{ item.label }}
                     </h5>

                </button>
            </template>
        </div>

        <!-- Options Icon -->

    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    path: String
});
const emit = defineEmits(['navigateTo'])
const breadcrumbs = computed(() => {
    if (!props.path) return [];

    let sanitizedPath = String(props.path); // Ép kiểu thành chuỗi
    sanitizedPath = sanitizedPath.replace(/\/$/, ''); // Xóa dấu `/` cuối nếu có

    const segments = sanitizedPath.split('/');
    return segments.map((label, index) => ({
        label,
        path: segments.slice(0, index + 1).join('/')
    }));
});


function navigateTo(path: string) {
    emit('navigateTo', path)
}
</script>

<style></style>