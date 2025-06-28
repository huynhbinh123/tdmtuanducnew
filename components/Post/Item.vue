<template>
    <div>
        <div class="bg-gray-900 shadow-md border border-gray-500 text-white/80 rounded-lg max-w-sm mb-5">
            <NuxtLinkLocale :to="`/blog/${item.slug}`">

                <NuxtImg class="rounded-t-lg" width="400" :src="item.image" alt="Vinawebapp.com" />

            </NuxtLinkLocale>

            <div class="p-5">
                <NuxtLinkLocale :to="`/blog/${item.slug}`">
                    <h5 class=" font-bold  tracking-tight mb-2 line-clamp-2">
                        {{ item.name }}
                    </h5>
                </NuxtLinkLocale>


                <p class="font-normal whitespace-pre-line text-gray-500 mb-3 line-clamp-3">
                    {{ item.desc }}
                </p>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/type';

defineProps<{
    item: Post;
}>();
</script>

<style></style>
