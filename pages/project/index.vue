<template>
    <div class="bg-page-project">

        <PageHeroSection :title="data.hero_section.title" :slogan="data.hero_section.slogan" />

        <UContainer>
            <Card>
                <ProjectList />
            </Card>

        </UContainer>


    </div>
</template>

<script lang="ts" setup>
interface AppearanceData {
    hero_section: {
        title: string;
        slogan: string;
    };


    meta: {
        title: string;
        desc: string;
        image: string;
    };
}

const { locale } = useI18n();
const { data } = await useHttp<AppearanceData>('load-data-project-page', {
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