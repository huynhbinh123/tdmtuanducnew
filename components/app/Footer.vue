<template>
  <footer class="relative border-t" style="overflow: hidden;">
    <UContainer>
      <div class="w-full py-3 md:pt-20">
        <div class="py-5 grid grid-cols-12 gap-4">
          <div class="lg:col-span-4 col-span-12 lg:order-1 order-2">
            <div class="flex items-center lg:justify-start justify-center hover:text-purple-500 cursor-pointer">
              <UIcon name="fa6-solid:phone" class="w-5 mr-4" />
              <span class="text-lg font-bold text-white">{{ formattedPhoneNumber(data.profile.phone) }}</span>
            </div>
          </div>
          <div class="lg:col-span-4 col-span-12 lg:order-2 order-1">
            <div class="flex items-center justify-center px-5">
              <NuxtImg quality="80" format="webp" :src="data.logo_full" class="lg:w-auto lg:h-24 h-18 w-auto max-w-full"
                alt="Company Logo" width="500" height="100" loading="lazy" />
            </div>
          </div>
          <div class="lg:col-span-4 col-span-12 lg:order-13 order-3">
            <div class="flex items-center lg:justify-end justify-center flex-wrap">
              <NuxtLinkLocale v-for="(item, key) in data.profile.social" :key="key" :to="item.to" target="_blank"
                :aria-label="item.label" class="p-2 lg:m-1">
                <div
                  class="rounded-lg w-10 h-10 bg-white hover:bg-white/70 border-white border-solid border-2 flex justify-center items-center">
                  <UIcon :name="item.icon" />
                </div>
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
        <div class="w-full h-px bg-purple-200"></div>
        <div class="w-full grid grid-cols-12 gap-4 py-10">
          <ul class="lg:col-span-9 col-span-12 flex lg:justify-start justify-center items-center flex-wrap">
            <li v-for="(item, index) in data.profile.tag" :key="index" class="p-3">
              <NuxtLinkLocale :to="item.to" class="text-base text-white/50 hover:text-white">
                {{ item.label }}
              </NuxtLinkLocale>
            </li>
          </ul>
          <div class="lg:col-span-3 col-span-12 flex lg:justify-end justify-center items-center flex-wrap">
            <span class="p-3 text-white/50"> © Vinawebapp.com Inc.</span>
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
interface FooterType {
  logo_full?: string;
  logo_icon?: string;
  favicon?: string;
  favicon_type?: string;
  profile: {
    phone: string;
    social: {
      label: string;
      icon: string;
      to: string;
    }[];
    tag: {
      label: string;
      to: string;
    }[];
  }
}

defineProps<{
  data: FooterType;
}>();

const formattedPhoneNumber = (phoneNumber: string) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");
  const part1 = cleanedNumber.slice(0, 3);
  const part2 = cleanedNumber.slice(3, 7);
  const part3 = cleanedNumber.slice(7, 10);
  return `${part1} ${part2} ${part3}`;
};

</script>

<style></style>
