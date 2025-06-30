<script lang="ts" setup>
import type { Form, FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

interface T {
    first_name: string;
    last_name: string;
    email: string;
    nation_phone: string;
    phone: string;
    company: string;
    from_hear: string;
    help_business: string[];
    note: string;
    is_send_mail: boolean;
}

const emit = defineEmits(['success'])
function onSuccess() {
    emit('success')
}
const { t } = useI18n()
const formRef = useTemplateRef<Form<any>>('formRef');

const errors = ref<FormError[]>([]);

const isLoading = ref(false)
const { locale } = useI18n()
const state = reactive<T>({
    first_name: '',
    last_name: '',
    email: '',
    nation_phone: '',
    phone: '',
    company: '',
    from_hear: '',
    help_business: [],
    note: '',
    is_send_mail: true
})

const help_business_options = [
    {
        label: t('form_contact.help_business.generate_leads'),
        value: 'Generate Leads'
    },
    {
        label: t('form_contact.help_business.optimize_website'),
        value: 'Optimize Website'
    },
    {
        label: t('form_contact.help_business.improve_loyalty'),
        value: 'Improve Brand Loyalty'
    },
    {
        label: t('form_contact.help_business.increase_revenue'),
        value: 'Increase Revenue'
    },
    {
        label: t('form_contact.help_business.rank_google'),
        value: 'Rank in Google'
    },
    {
        label: t('form_contact.help_business.market_share'),
        value: 'Increase Market Share'
    }
]
const hear_about_us_options = [
    'ChatGPT',
    'Google',
    'WebDesignRankings',
    'UpCity',
    'DesignRush',
    '10Best',
    'Clutch',
    'Top Design Firms',
    'GoodFirms',
    'Agency Spotter',
    'Bing',
    'Top Interactive Agencies',
    t('form_contact.social_media'),
    t('form_contact.other')
]

const isSucess = ref(false)
const validate = (state: any): FormError[] => {
    return errors.value;
};
async function onError(event: FormErrorEvent) {

    if (event?.errors?.[0]?.id) {
        const element = document.getElementById(event.errors[0].id)
        element?.focus()
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}
const pushServerErrors = (serverErrors: FormError[]) => {
    serverErrors.map((error) => (
        errors.value.push({
            name: error.name,
            message: error.message
        })

    ))
    formRef.value?.setErrors(errors.value)
    return errors.value;
}
const clearErrors = () => {
    errors.value = [];
    formRef.value?.setErrors(errors.value);
}
const { refresh,status} =   useHttp('/send-contact', {
        method: 'POST',
        query: {
            locale: locale.value
        },
        body: state,
        immediate: false,
        watch: false,
        onFetchResponse({ response }) {
            if (response.ok) {
                isSucess.value = true;
                
            } else {
                if (response.status == 422) {
                    // formRef.value.setErrors(response._data?.errors);

                    pushServerErrors(response._data.errors)
                }



            }
        }

    });
const onSubmit = async (event: FormSubmitEvent<typeof state>) => {
    if (isLoading.value) return;
    clearErrors();
    isLoading.value = true;
    await refresh()
    
    isLoading.value = false;

}


</script>
<template>
    <UModal style="background: none;" fullscreen size="">
        <template #content>
            <div class="bg-black/80 w-screen h-screen overflow-y-auto   flex lg:items-center items-start justify-center">
                <div class="relative">
                    <VnwaLoading v-if="isLoading" />
                    
                    <UForm v-if="!isSucess"  ref="formRef" :validate="validate" :state="state" class="space-y-4  relative"
                    @submit="onSubmit">
                        <div class="bg-black/50 text-white p-6 max-w-5xl mx-auto rounded-lg relative">
                            <button type="button" @click="onSuccess()"
                                class="absolute top-4 right-4 text-white hover:text-red-500 cursor-pointer">
                                <UIcon name="material-symbols:close" class="size-8" />
                            </button>

                            <h2 class="text-3xl md:text-4xl max-w-xl mx-auto font-bold text-center mb-2">
                                {{ $t('form_contact.title') }}
                            </h2>
                            <p class="text-center mb-6 text-gray-300">
                                {{ $t('form_contact.subtitle') }}
                            </p>

                            <div class="space-y-6">
                                <!-- Họ và Tên -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <UFormField name="first_name">
                                        <UInput v-model="state.first_name" type="text" :placeholder="$t('first_name')"
                                            :ui="{ base: 'w-full p-3 bg-white text-black rounded-none' }" required />
                                    </UFormField>

                                    <UFormField name="last_name">
                                        <UInput v-model="state.last_name" type="text" :placeholder="$t('last_name')"
                                            :ui="{ base: 'w-full p-3 bg-white text-black rounded-none' }" required />
                                    </UFormField>
                                </div>

                                <!-- Email + Phone -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <UFormField name="email" >
                                        <UInput type="email" v-model="state.email" :placeholder="$t('email')"
                                            :ui="{ base: 'w-full p-3 bg-white text-black rounded-none' }" required />
                                    </UFormField>

                                    <UFormField name="phone">
                                        <InputPhone v-model="state.phone" v-model:modelNation="state.nation_phone" required />
                                    </UFormField>
                                </div>

                                <!-- Công ty + From hear -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <UFormField name="company">
                                        <UInput v-model="state.company" type="text" :placeholder="$t('company')"
                                            :ui="{ base: 'w-full p-3 bg-white text-black rounded-none' }" />
                                    </UFormField>

                                    <UFormField name="from_hear">
                                        <select v-model="state.from_hear" class="w-full p-3 bg-white text-black ">
                                            <option value="" disabled>
                                                {{ $t('form_contact.from_hear_placeholder') }}
                                            </option>
                                            <option v-for="(item, index) in hear_about_us_options" :key="index"
                                                :value="item">
                                                {{ item }}
                                            </option>
                                        </select>
                                    </UFormField>
                                </div>

                                <!-- Help My Business -->
                                <div>
                                    <h3 class="block font-semibold mb-2 text-xl">
                                        {{ $t('form_contact.help_my_business') }}
                                    </h3>
                                    <div class="ps-3">
                                        <UFormField name="help_business">
                                            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-white text-md">
                                                <label v-for="(item, index) in help_business_options" :key="index"
                                                    :for="`help_my_business_${index}`" class="cursor-pointer">
                                                    <input type="checkbox" :id="`help_my_business_${index}`"
                                                        v-model="state.help_business" :value="item.value"
                                                        class="mr-1" />
                                                    <span>{{ item.label }}</span>
                                                </label>
                                            </div>
                                        </UFormField>
                                    </div>
                                </div>

                                <!-- Ghi chú -->
                                <UFormField name="note">
                                    <textarea v-model="state.note" required :placeholder="$t('form_contact.note')"
                                        class="w-full p-4 h-32 bg-white text-black"></textarea>
                                </UFormField>

                                <!-- Đăng ký nhận mail -->
                                <div class="flex items-center cursor-pointer">
                                    <label for="newsletter"
                                        class="text-sm flex items-center gap-2 cursor-pointer text-white">
                                        <input v-model="state.is_send_mail" type="checkbox" id="newsletter" />
                                        <span>
                                            {{ $t('form_contact.newsletter.line1') }} <br />
                                            {{ $t('form_contact.newsletter.line2') }}
                                        </span>
                                    </label>
                                </div>

                               
                                <UButton icon="mdi:content-save" :loading="isLoading" type="submit" :disabled="isLoading"
                                :ui="{ base: 'button text-center  justify-center' }"

                                    class="w-full  text-white py-3 font-semibold">
                                    {{ $t('form_contact.submit') }}
                                </UButton>
                            </div>
                        </div>
                    </UForm>
                    <div v-else>
                        <div class="bg-black/50 text-white p-6 max-w-5xl mx-auto rounded-lg text-center">
                            <button type="button" @click="onSuccess()"
                                class="absolute top-4 right-4 text-white hover:text-red-500 cursor-pointer">
                                <UIcon name="material-symbols:close" class="size-8" />
                            </button>

                            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                                {{ $t('form_contact.success_title') }}
                            </h2>
                            <p class="text-lg text-gray-300 mb-6">
                                {{ $t('form_contact.success_message') }}
                            </p>
                            <UButton @click="onSuccess" class="w-full text-white py-3 font-semibold">
                                {{ $t('form_contact.success_button') }}
                            </UButton>
                        </div>

                    </div>
                </div>
            </div>
        </template>
    </UModal>
</template>
<style >
.button{
    background: linear-gradient(to bottom, #9c19d8, #20a2c2);
            background-size: cover;
            background-blend-mode: overlay;    
}
</style>