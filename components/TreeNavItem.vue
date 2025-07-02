<template>
  <div>
    <div class="cursor-pointer flex items-center gap-1">
      <div class="flex items-center gap-1">
        <NuxtLinkLocale
          :to="`/blog/category/${item.slug}`"
          :class="[
            'hover:text-gray-500',
            item.slug === currentSlug
              ? 'text-orange-600 font-semibold'
              : 'text-orange-500',
          ]"
        >
          {{ item.name }}
        </NuxtLinkLocale>

        <div v-if="item.child" @click.stop="toggle" class="cursor-pointer">
          <span class="!text-gray-500 text-sm select-none">
            {{ isOpen ? "▲" : "▼" }}
          </span>
        </div>
      </div>
    </div>

    <transition name="slide">
      <ul v-show="isOpen" class="ms-4 mt-1 space-y-1">
        <li v-for="(nav, index) in item.child" :key="index">
          <TreeNavItem
            :item="nav"
            :expandedSlug="expandedSlug"
            @toggle="$emit('toggle', $event)"
          />
        </li>
      </ul>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

interface Item {
  name: string;
  slug: string;
  child?: Item[];
}

const props = defineProps<{
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
    if (item.child) {
      return item.child.some((sub) => hasMatch(sub));
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
const currentSlug = computed(
  () => route.params.slug || route.path.split("/").pop()
);
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
  max-height: 1000px; /* lớn hơn chiều cao thực tế */
}
</style>
