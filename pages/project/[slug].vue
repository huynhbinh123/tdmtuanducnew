<template>
    <div class="bg-page-project" v-if="status == 'success'">
        <UContainer>
            <Card class="min-h-screen relative" style="padding: 0;">
                <div class="bg-black p-5">
                    <div class="relative">
                        <NuxtImg class="w-full lg:h-[500px] h-40 object-cover" :src="data.image" alt="Project Image" />
                    </div>
                    <div>
                        <div class="flex items-center justify-center lg:-translate-y-40">
                            <div class="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full text-center">
                                <h1 class="text-2xl lg:text-3xl md:text-2xl sm:text-xl font-bold mb-2 text-black">{{
                                    data.name }}</h1>
                                <ul class="flex items-center justify-center gap-3 flex-wrap">
                                    <li v-for="(item, index) in data.tags" :key="index">
                                        <button
                                            class="bg-gray-200 text-black/80 px-3 lg:px-4 md:px-3 sm:px-2 text-sm lg:text-base md:text-sm sm:text-xs">{{
                                                item }}</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-full h-30 bg-gray-500/10 lg:-translate-y-40">
                            <div class="h-full w-full flex items-center justify-center text-white gap-4">
                                <h5 class="text-base lg:text-lg md:text-base sm:text-sm">Jump To: </h5>
                                <ul
                                    class="lg:flex space-y-3 items-center justify-center gap-8 font-bold lg:text-2xl md:text-xl text-sm">
                                    <li>

                                        <button @click="scrollToSection('introduction')"
                                            class="uppercase text-primary-500 hover:text-primary-500">{{
                                                t('introduction') }}</button>
                                    </li>
                                    <li>
                                        <button  @click="scrollToSection('journey')" class="uppercase text-primary-500 hover:text-primary-500">{{
                                            t('journey') }}</button>
                                    </li>
                                    <li>
                                        <button  @click="scrollToSection('gallery')" class="uppercase text-primary-500 hover:text-primary-500">{{
                                            t('gallery') }}</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="min-h-screen pb-20 divide-y-2 divide-dashed">
                            <div class="grid grid-cols-12 gap-4 py-8" id="introduction">
                                <div class="col-span-12 lg:col-span-4">
                                    <div class="w-full flex items-start justify-center">
                                        <NuxtImg :src="data.logo" class="bg-white" width="200" />
                                    </div>
                                </div>
                                <div class="col-span-12 lg:col-span-8">
                                    <div class="text-white text-sm lg:text-base md:text-sm sm:text-xs"
                                        v-html="data.content"></div>
                                </div>
                            </div>
                            <div class="py-8" id="journey">
                                <h2 class="text-center project_title text-vnwa-500 pt-10 pb-5 ">
                                    {{ t('journey') }}
                                </h2>
                                <div v-if="data.after_image && data.before_image"
                                    class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                    <div class="flex items-center justify-center">
                                        <div class="text-center">
                                            <h4 class="mb-2 text-sm lg:text-base md:text-sm sm:text-xs">Before</h4>
                                            <NuxtImg :src="data.before_image" class="w-full h-auto"
                                                alt="Before Transformation" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-center">
                                        <div class="text-center">
                                            <h4 class="mb-2 text-sm lg:text-base md:text-sm sm:text-xs">After</h4>
                                            <NuxtImg :src="data.after_image" class="w-full h-auto"
                                                alt="After Transformation" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="data.domain" class="flex items-center justify-center py-10">
                                    <UButton class="mt-5" :ui="{ label: 'project_text_view_website' }" variant="outline"
                                        size="xl" color="primary" target="_blank" :to="data.domain"
                                        :label="$t('view_website')" />
                                </div>
                                <TimeLine :data="timeline" />
                            </div>
                            <div class="py-8 lg:px-0 px-5 relative" id="gallery">
                                <h2 class="text-center project_title text-vnwa-500 pt-10 pb-5 ">
                                    {{ t('gallery') }}
                                </h2>
                                <UCarousel v-slot="{ item }" loop arrows :items="data.galery"
                                    class="w-full lg:max-w-2xl  mx-auto">
                                    <NuxtImg :src="item" width="700" height="700" class="rounded-lg w-full" />
                                </UCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </UContainer>
    </div>
</template>
<script lang="ts" setup>
import type { Project } from '~/type';


const { t, locale } = useI18n();
const route = useRoute();
const timeline = reactive([]);
const { data, status } = await useHttp<Project>(`load-data-project/${route.params.slug}`, {
    method: 'GET',
    params: {
        locale: locale
    }
});

if (data.value.objective) {
    timeline.push({
        icon: 'pajamas:issue-type-objective',
        label: t('objective'),
        content: data.value.objective
    });
}
if (data.value.approach) {
    timeline.push({
        icon: 'hugeicons:nano-technology',
        label: t('approach'),
        content: data.value.approach
    });
}
if (data.value.impact) {
    timeline.push({
        icon: 'game-icons:anvil-impact',
        label: t('impact'),
        content: data.value.impact
    });
}
if (data.value.results) {
    timeline.push({
        icon: 'garden:growth-chart-stroke-12',
        label: t('results'),
        content: data.value.results
    });
}



useSeoMeta({
    title: data.value.meta.title,
    description: data.value.meta.desc,
    ogTitle: data.value.meta.title,
    ogDescription: data.value.meta.desc,
    ogImage: useNuxtApp().$storage(data.value.meta.image),
    twitterTitle: data.value.meta.title,
    twitterDescription: data.value.meta.desc,
    twitterImage: useNuxtApp().$storage(data.value.meta.image),
});

</script>


<style scoped></style>