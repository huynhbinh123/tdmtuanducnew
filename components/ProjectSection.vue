<script lang="ts" setup>
import type { Project } from '~/type';
const { data, status } = await useHttp<Project[]>('load-data-feature-projects', {
    method: 'GET',
    params: {
        locale: useI18n().locale
    }
});



const dataTopProject = [
    {
        cate_name: "Web Development",
        name: "VinaWebApp CMS",
        slug: "/",
        desc: "A powerful CMS built with Laravel and Vue.js, providing seamless user experience and high customization.",
        url_avatar: "https://via.placeholder.com/768x432",
        url_avatar_mobile: "https://via.placeholder.com/480x270"
    },
    {
        cate_name: "E-commerce",
        name: "Happy Paws Store",
        slug: "/",
        desc: "An online pet store built with Nuxt.js and Laravel, optimized for speed and SEO.",
        url_avatar: "https://via.placeholder.com/768x432",
        url_avatar_mobile: "https://via.placeholder.com/480x270"
    },
    {
        cate_name: "Movie Streaming",
        name: "Parap Movies",
        slug: "/",
        desc: "A movie streaming platform with smooth user experience and a vast collection of films.",
        url_avatar: "https://via.placeholder.com/768x432",
        url_avatar_mobile: "https://via.placeholder.com/480x270"
    }
];
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
                            <h6
                                class="text-white/50 section-sub-text inline-block md:mt-6 mt-3 add-transition hover:text-white">
                                {{ $t('see_all_projects') }}
                                <Icon name="mdi-light:arrow-right" class="ml-2" />
                            </h6>
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
