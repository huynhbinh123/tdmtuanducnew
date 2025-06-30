<template>
    <div class="fixed  z-20  lg:bottom-20 bottom-10  lg:right-20 right-4">
        <div class="relative">

            <!-- LIVE CHAT -->
            <div class="absolute top-0 -left-25 z-50 rounded-full flex items-center justify-center text-center size-20 text-sm font-bold let_talk_button_bg transition-all duration-300 ease-out transform"
                :class="{ 'opacity-100 scale-100 translate-y-0': isShow, 'opacity-0 scale-90 translate-y-2': !isShow }">
                <NuxtLink aria-label="Vinawebapp.com Live Chat" target="_blank" class="w-full h-full" :to="live_chat_url">
                    <div class="w-full h-full flex items-center justify-center text-white ">

                        Live Chat
                    </div>
                </NuxtLink>
            </div>

            <!-- START PROJECT -->
            <div class="absolute -top-25 -left-14 z-50 rounded-full flex items-center justify-center text-center size-20 text-sm font-bold let_talk_button_bg transition-all duration-300 ease-out transform"
                :class="{ 'opacity-100 scale-100 translate-y-0': isShow, 'opacity-0 scale-90 translate-y-2': !isShow }">
                <button @click="openContactModal()" class="w-full h-full text-white  px-2 flex items-center justify-center">
                   {{ $t('get_in_touch') }}
                </button>
            </div>

            <!-- TOGGLE BUTTON -->
            <button @click="() => isShow = !isShow"
                class="bg-black shadow-2xl shadow-primary-500 z-50 lg:size-24 size-16 rounded-full">
                <NuxtImg :src="logo_icon" class="w-full h-full" width="100" height="100" />
            </button>

        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    live_chat_url: {
        type: String,
        default: ''
    },
    logo_icon: {
        type: String,
        default: ''
    }
})
const isShow = ref(false);
const emit = defineEmits(['openContactModal']);
const openContactModal = () => {
    emit('openContactModal');
    isShow.value = false;
};
</script>

<style scoped></style>