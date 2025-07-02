<template>
  <div>
    <NuxtLinkLocale :to="`/${slug}`">
      <div
        class="group transition-transform duration-300 cursor-pointer border hover:border-orange-500 border-gray-200 hover:shadow-lg"
      >
        <NuxtImg
          :src="image"
          alt=""
          class="bg-black/50 hover:bg-black/40 rounded-t-sm w-full"
        />
        <h3 class="text-white text-center bg-black/80 p-2">
          {{ name }}
        </h3>

        <div class="bg-white/90 p-2">
          <p class="text-gray-700 text-sm mb-2">{{ description }}</p>
          <div class="flex items-center gap-2 justify-between">
            <div>
              <span class="text-orange-600 font-bold text-lg mr-2"
                >{{ price.toLocaleString() }}₫</span
              >
              <span
                v-if="price_old && price_old > price"
                class="text-gray-400 line-through text-sm"
                >{{ price_old.toLocaleString() }}₫</span
              >
            </div>
            <div>
              <div class="bg-orange-400 text-white px-4 py-2 rounded-3xl">
                {{ discountPercent }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  slug: { type: String, default: "" },
  price: { type: Number, default: 0 },
  price_old: { type: Number, default: 0 },
  discountPercent: { type: Number, default: 0 },
});

const discountPercent = computed(() => {
  if (props.price_old && props.price_old > props.price) {
    const percent = Math.round(
      ((props.price_old - props.price) / props.price_old) * 100
    );
    return `-${percent}%`;
  }
  return null;
});
</script>

<style></style>
