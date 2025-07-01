<template>
  <div>
    <HeroSection :data="data.hero_section" />
    <BrandSlideSection :data="data.brand_section" />
    <ProjectSection :data="data.projects" />
    <FeedbackSection :data="data.feedback_section" />
    <WhyMeSection :data="data.why_me_section" />
    <ShortAboutSection />
    <AreYouReadySection />
  </div>
</template>

<script lang="ts" setup>
import type { Project } from '~/type';

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
  desc: string;
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
  projects: Project[];
  meta: Meta;
}
const { locale } = useI18n();
const { data } = await useHttp<AppearanceData>('load-data-home-page', {
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