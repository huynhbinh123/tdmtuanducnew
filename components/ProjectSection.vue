<script lang="ts" setup>
import type { Project } from '~/type';

defineProps<{
    data: Project[];
}>();
</script>

<template>
    <div class=" bg-1">
        <UContainer>

            <div class="grid grid-cols-12 gap-4 w-full md:py-20 py-10">
                <div
                    class="xl:col-span-4 col-span-12 xl:text-start flex xl:justify-start justify-center items-top pt-5">
                    <div>
                        <h2 class="text-white font-semibold uppercase"> {{ $t('featured_projects') }}
                        </h2>
                        <NuxtLinkLocale to="/">
                            <p class="text-white/50 text-xl inline-block md:mt-6 mt-3 add-transition hover:text-white">
                                {{ $t('see_all_projects') }}
                                <Icon name="mdi-light:arrow-right" class="ml-2" />
                            </p>
                        </NuxtLinkLocale>
                    </div>
                </div>
                <div class="xl:col-span-8 col-span-12 relative">
                    <div class="grid grid-cols-12 gap-4 w-full">
                        <div v-for="(item, index) in data" :key="index"
                            :class="{ 'lg:col-span-12': index === 0, 'lg:col-span-6': index !== 0 }"
                            class="col-span-12 mb-3">
                            <NuxtLinkLocale :to="`/project/${item.slug}`"
                                class="block h-full bg-card2 rounded-2xl opacity-[85%] hover:opacity-100 cursor-pointer p-4">
                                <Card>
                                    <div class="grid grid-cols-12 gap-4">
                                        <div :class="{ 'lg:col-span-6 lg:pr-20': index === 0, 'lg:col-span-12': index !== 0 }"
                                            class="col-span-12">
                                            <div class="lg:py-5 md:pr-3">


                                                <h3
                                                    class=" text-primary-500 flex items-center justify-start flex-wrap uppercase font-header font-semibold pb-4 md:text-3xl text-xl">
                                                    {{ item.name }}
                                                    <UIcon name="mdi-light:arrow-right" class="ml-2 size-8" />
                                                </h3>

                                                <div class="text-formatting">
                                                    <p
                                                        class="text-white/70 md:text-base line-clamp-3 text-sm whitespace-pre-line">
                                                        {{ item.desc }}</p>
                                                </div>
                                                <ul class="flex items-center justify-start gap-2 flex-wrap  mt-3">
                                                    <template v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                                                        <li v-if="tagIndex <= 4">
                                                            <button
                                                                class="bg-white/10 text-white/70  px-2 text-xs  rounded-lg">
                                                                {{ tag }}
                                                            </button>
                                                        </li>
                                                    </template>

                                                    <li v-if="item.tags.length > 4">
                                                        <button
                                                            class="bg-white/10 text-white/70 px-2 text-xs rounded-lg">
                                                            ...
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div :class="{ 'lg:col-span-6 lg:order-first': index === 0, 'lg:col-span-12': index !== 0 }"
                                            class="col-span-12 flex justify-start items-start">
                                            <NuxtImg quality="80" format="webp" loading="lazy" width="100" height="100"
                                                :src="item.image"
                                                :srcset="item.image + ' 768w,' + item.image + ' 1200w'"
                                                sizes="(min-width:768px) 365px, 100vw"
                                                class="block rounded-lg w-full h-auto xs:mx-auto"
                                                :alt="'vinawebapp.com - ' + item.name" />
                                        </div>
                                    </div>
                                </Card>
                            </NuxtLinkLocale>
                        </div>
                    </div>
                </div>
            </div>
        </UContainer>

    </div>
</template>
