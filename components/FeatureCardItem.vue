<script lang="ts"  setup>
 interface FeatureCardItem {
  icon: string;
  label: string;
  desc: string;
  animateColor?: string;
}
defineProps<{
  data: FeatureCardItem;
}>();

</script>
<template>
    <div class="section_why_me_item">
        <div class="icon flex w-full items-center justify-center">
            <div class="relative">
                <Icon :name="data.icon" class="size-20 " />
                <div v-if="data.animateColor"
                    class="absolute top-2 w-16 h-12 rounded-full blur-[12px]  animate-[glow_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                    :class="data.animateColor"
                ></div>
            </div>
        </div>
        <div class="text-xl font-bold mb-3 text-center">{{ data.label }}</div>
        <div class="text-base text-center text-white/80 p-3">{{ data.desc }}</div>
    </div>
</template>
<style>

  
</style>