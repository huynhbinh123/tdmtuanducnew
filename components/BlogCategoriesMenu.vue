<template>
    <ul class="space-y-1">
        <li>
            <NuxtLinkLocale :to="`/blog`" :class="[
                'hover:text-gray-500',
                currentSlug === 'blog'
                    ? 'text-primary-500 font-semibold'
                    : 'text-white',
            ]">
                {{ $t('blog') }}
            </NuxtLinkLocale>
        </li>
        <li v-for="(item, index) in data" :key="index">
            <TreeNavItem parent_slug="blog/category" :item="item" :expandedSlug="null" @toggle="$emit('toggle', $event)" />
        </li>
    </ul>
</template>

<script lang="ts" setup>
interface T {
    name: string;
    slug: string;
    children?: T[];
}



const { locale } = useI18n();
const { data, status } = await useHttp<T[]>('load-data-menu-blog-categories', {
    method: 'GET',
    params: {
        locale: locale
    }
});
const route = useRoute();
onMounted(() => {
    const currentSlug = route.path.split("/").filter(Boolean).pop();

    const hasMatch = (item: T): boolean => {
        if (item.slug === currentSlug) return true;
        if (item.children) {
            return item.children.some((sub) => hasMatch(sub));
        }
        return false;
    };


});


const currentSlug = computed(
    () => route.params.slug || route.path.split("/").pop()
);
</script>

<style></style>