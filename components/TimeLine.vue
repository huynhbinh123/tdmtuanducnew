<template>
    <div>
        <ul class="timeline">
            <li v-for="(item, index) in data" :key="index" class=" flex items-start justify-start  gap-4">
                <div class="">
                    <UIcon :name="item.icon" class="lg:w-15 w-10 lg:h-15 h-10 text-primary-400" />
                </div>
                <div class="">
                    <div class="lg:h-15 h-10  flex items-center">
                        <h3 class="font-semibold">{{ item.label }}</h3>
                    </div>
                    <div class="pb-8 ps-5 relative">
                        <div v-if="index != data.length - 1"
                            class="absolute  lg:-left-[48px] -left-[40px] w-1 bg-primary-400 top-0 bottom-0"></div>
                        <div class=" w-full text-white/90" v-html="item.content"></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
interface T {
    icon: string;
    label: string;
    content: string;
}
defineProps<{
    data: T[]
}>();

</script>

<style></style>