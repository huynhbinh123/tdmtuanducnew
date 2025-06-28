<template>
    <div class="bg-page-project" v-if="status == 'success'">


        <UContainer>
            <Card class="min-h-screen relative">
                <div class="relative">
                    <NuxtImg class="w-full h-[500px] object-cover" :src="data.image" alt="Project Image" />
                </div>
             <div>
                <div class="flex items-center justify-center -translate-y-32">
                    <div class="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full text-center">
                        <h1 class="text-2xl font-bold mb-2 text-black">{{ data.name }}</h1>
                        <ul class="flex items-center justify-center gap-3 flex-wrap">
                            <li v-for="(item, index) in data.tags" :key="index">
                                <UBadge :label="item" variant="solid" size="sm" color="neutral" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-full h-48 bg-black/90 -translate-y-32"></div>
             </div>

            </Card>

        </UContainer>


    </div>
</template>
<script lang="ts" setup>
import type { Project } from '~/type';


const { locale } = useI18n();
const route = useRoute();
console.log(route)
const { data, status } = await useHttp<Project>(`load-data-project/${route.params.slug}`, {
    method: 'GET',
    params: {
        locale: locale
    }
});
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


<style></style>