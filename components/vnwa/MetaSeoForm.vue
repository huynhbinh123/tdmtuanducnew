<template>
    <UCard>
        <template #header>
            <h3>Meta Seo {{name}}</h3>
        </template>
        <div class="space-y-4">
            <!-- Meta Image -->
            <div>
                <UFormField :label="$t('vnwa.meta.image.label')" name="meta_image"
                    :description="$t('vnwa.meta.image.description')">
                    <VnwaInputImage :resize="[1200, 630]" v-model="meta.image" />
                </UFormField>
            </div>


            <div>
                <UFormField :label="$t('vnwa.meta.title.label')" name="meta_title"
                    :description="$t('vnwa.meta.title.description')">
                    <UInput v-model="meta.title" />
                </UFormField>
            </div>

            <!-- Meta Description -->
            <div>
                <UFormField :label="$t('vnwa.meta.desc.label')" name="meta_desc"
                    :description="$t('vnwa.meta.desc.description')">
                    <UTextarea v-model="meta.desc" />
                </UFormField>
            </div>

        </div>
    </UCard>
</template>

<script lang="ts" setup>
import type { FormError } from '@nuxt/ui';
import { defineProps, defineEmits, ref, watch } from 'vue';
import type { MetaSeo } from '~/type'

interface Props {
  meta: MetaSeo;
  name?: string;
  image?: string;
}

const props = defineProps<Props>();
const { t } = useI18n()

const emit = defineEmits();
watch(() => props.name, (newVal) => {
    if (newVal && !props.meta.title) {
        props.meta.title = newVal
    } 
}, { deep: true });
const validateMetaSeo = (state: MetaSeo): FormError[] => {
    const errors: FormError[] = [];

    if (!state.title || state.title.length > 100) {
        errors.push({ name: 'meta_title', message: t('vnwa.error_message.meta.title') });
    }

    if (!state.desc || state.desc.length > 300) {
        errors.push({ name: 'meta_desc', message: t('vnwa.error_message.meta.desc') });
    }

    if (!state.image || state.image.length < 5) {
        errors.push({ name: 'meta_image', message: t('vnwa.error_message.meta.image') });
    }

    emit('update:errors', errors);
    return errors;
};

// Gọi hàm validate mỗi khi state thay đổi
watch(() => props.meta, (newVal) => {
    if (newVal) {
        validateMetaSeo(newVal);
    } else {
        console.error("props.meta is not defined");
    }
}, { deep: true });
</script>
