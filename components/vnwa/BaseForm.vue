<template>
    <div class="space-y-4">
        <UCard>
            <div class="space-y-4">
                <div class="grid grid-cols-1 gap-4">
                    <UFormField label="Name" name="name" required>
                        <UInput v-model="data.name" @change="nameChange()" />
                    </UFormField>
                    <UFormField label="Slug" name="slug" required>
                        <UButtonGroup class="w-full">
                            <UBadge color="neutral" variant="outline" size="lg"
                                :label="`${config.public.appUrl}${localePath(parentURL)}`" />

                            <UInput :loading="isSlugLoading" color="neutral" variant="outline" v-model="data.slug" placeholder="page-slug" />
                        </UButtonGroup>
                    </UFormField>
                </div>
            </div>
        </UCard>
        <slot />
        <UCard>
            <template #header>
                <h3>Meta Seo</h3>
            </template>
            <div class="space-y-4">
                <!-- Meta Image -->
                <div>
                    <UFormField :label="$t('vnwa.meta.image.label')" name="meta_image"
                        :description="$t('vnwa.meta.image.description')">
                        <VnwaInputImage :resize="[1200, 630]" v-model="data.meta_image" />
                    </UFormField>
                </div>


                <div>
                    <UFormField :label="$t('vnwa.meta.title.label')" name="meta_title"
                        :description="$t('vnwa.meta.title.description')">
                        <UInput v-model="data.meta_title" />
                    </UFormField>
                </div>

                <!-- Meta Description -->
                <div>
                    <UFormField :label="$t('vnwa.meta.desc.label')" name="meta_desc"
                        :description="$t('vnwa.meta.desc.description')">
                        <UTextarea v-model="data.meta_desc" />
                    </UFormField>
                </div>

            </div>
        </UCard>
    </div>
</template>

<script lang="ts" setup>
import type { FormError } from '@nuxt/ui';
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { BaseFormType } from '~/type';




// Các props và emits
const props = defineProps({
    data: {
        type: Object as PropType<BaseFormType>,
        required: true,
    },
    type: String,
    id: {
        type: Number,
        default: null
    }
});
const { t } = useI18n()
const emit = defineEmits();
const config = useRuntimeConfig();
const localePath = useLocalePath();
const parentURL = ref();
const slugRequestUrl = ref();
const isSlugLoading = ref(false);



switch (props.type) {
    case 'blog_category':
        parentURL.value = '/bc';
        slugRequestUrl.value = '/vnwa/blog/category/load-slug';
        break;
    default:
        break;
}


const nameChange = async () => {
    isSlugLoading.value = true;
    await useHttp(`${slugRequestUrl.value}/${props.data.name}`,
        {
            onResponse({ response }) {
                if (response.ok) {
                    props.data.slug = response._data.slug
                    isSlugLoading.value = false;

                }
            }
        }
    )
    if (!props.data.meta_title) {
        props.data.meta_title = props.data.name
    }


}




const validate = (state: BaseFormType): FormError[] => {
    const errors: FormError[] = [];

    if (!state.meta_title || state.meta_title.length > 100) {
        errors.push({ name: 'meta_title', message: t('vnwa.meta.title.error_message') });
    }

    if (!state.meta_desc || state.meta_desc.length > 300) {
        errors.push({ name: 'meta_desc', message: t('vnwa.meta.desc.error_message') });
    }

    if (!state.meta_image || state.meta_image.length < 5) {
        errors.push({ name: 'meta_image', message: t('vnwa.meta.image.error_message') });
    }

    emit('update:errors', errors);
    return errors;
};

// Gọi hàm validate mỗi khi state thay đổi
watch(() => props.data, (newVal) => {
    if (newVal) {
        validate(newVal);
    } else {
        console.error("props.meta is not defined");
    }
}, { deep: true });
</script>


<style></style>