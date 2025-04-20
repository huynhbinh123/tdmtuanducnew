<template>
  <div>
    <HeroSection :data="appearanceData.hero_section" />
    <BrandSlideSection :data="appearanceData.brand_section"  />
    <ProjectSection />
    <FeedbackSection :data="appearanceData.feedback_section" />
    <WhyMeSection />
    <ShortAboutSection />
    <AreYouReadySection />
  </div>
</template>

<script lang="ts" setup>
interface HeroSection {
  title: string;
  slogan: string;
}

interface BrandSectionItem {
  label: string;
  image: string;
  to: string;
}

interface FeedbackSectionItem {
  label: string;
  image: string;
  content: string;
}

interface WhyMeSectionItem {
  icon: string;
  label: string;
  content: string;
}

interface ShortAboutSection {
  label: string;
  content: string;
}

interface Meta {
  title: string;
  desc: string;
  image: string;
}

interface AppearanceData {
  hero_section: HeroSection;
  brand_section: BrandSectionItem[];
  feedback_section: FeedbackSectionItem[];
  why_me_section: WhyMeSectionItem[];
  short_about_section: ShortAboutSection;
  meta: Meta;
}
const { locale } = useI18n();
const { data } = await useHttp('load-data-home-page', {
  method:'GET',
  params: {
    locale: locale
  }
});
let appearanceData = await data.value as AppearanceData;
useSeoMeta({
  title: appearanceData.meta.title,
  description: appearanceData.meta.desc,
  ogTitle: appearanceData.meta.title,
  ogDescription: appearanceData.meta.desc,
  ogImage: useNuxtApp().$storage(appearanceData.meta.image),
  twitterTitle: appearanceData.meta.title,
  twitterDescription: appearanceData.meta.desc,
  twitterImage: useNuxtApp().$storage(appearanceData.meta.image),
});

</script>

<style></style>