<template>
    <div>
        <div class="cursor-pointer flex items-center gap-1">
            <div class="flex items-center gap-2">
                <NuxtLinkLocale :to="`/${parent_slug}/${item.slug}`" :class="[
                    'hover:text-gray-500',
                    route.params.slug === item.slug
                        ? 'text-primary-500 font-semibold'
                        : 'text-white',
                ]">
                    {{ item.name }}
                </NuxtLinkLocale>

                <div v-if="item.children && item.children.length > 0" @click.stop="toggle" class="cursor-pointer">
                    <span class="!text-gray-500 text-lg select-none">
                        {{ isOpen ? "▲" : "▼" }}
                    </span>
                </div>
            </div>
        </div>

        <transition name="slide">
            <ul v-show="isOpen" class="ms-4 mt-1 space-y-1">
                <li v-for="(nav, index) in item.children" :key="index">
                    <TreeNavItem :item="nav" :parent_slug="parent_slug" :expandedSlug="expandedSlug"
                        @toggle="$emit('toggle', $event)" />
                </li>
            </ul>
        </transition>
    </div>
</template>
<script setup lang="ts">

interface Item {
    name: string;
    slug: string;
    children?: Item[];
}

const props = defineProps<{
    parent_slug: string;
    item: Item;
    expandedSlug: string | null;
}>();

const emit = defineEmits(["toggle"]);

const isOpen = ref(false);
const route = useRoute();

// Mở ra nếu route hiện tại trùng với slug hoặc slug con
onMounted(() => {
    const currentSlug = route.path.split("/").filter(Boolean).pop();

    const hasMatch = (item: Item): boolean => {
        if (item.slug === currentSlug) return true;
        if (item.children) {
            return item.children.some((sub) => hasMatch(sub));
        }
        return false;
    };

    if (hasMatch(props.item)) {
        isOpen.value = true;
    }
});

// Toggle khi nhấn vào mũi tên
function toggle() {
    isOpen.value = !isOpen.value;
}

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    max-height: 1000px;
    /* lớn hơn chiều cao thực tế */
}
</style>