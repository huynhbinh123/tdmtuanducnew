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
                                :label="`${config.public.appUrl}${parentURL}`" />

                            <UInput :loading="isSlugLoading" @change="slugChange()" color="neutral" variant="outline"
                                v-model="data.slug" placeholder="page-slug" />
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
const { t, locale } = useI18n()
const emit = defineEmits();
const config = useRuntimeConfig();
const parentURL = ref();
const slugRequestUrl = ref();
const isSlugLoading = ref(false);

onMounted(() => {


  if (!props.data.meta_desc) {
    props.data.meta_desc = 'A Website Design Company Light Years Ahead of Its Time'
  }

  if (!props.data.meta_image) {
    props.data.meta_image = 'vnwa_setup/vnwa_logo_icon.png'
  }
})

switch (props.type) {
    case 'blog_category':
        parentURL.value = '/blog/category';
        slugRequestUrl.value = '/vnwa/blog/category/load-slug';
        break;
    case 'tag':
        parentURL.value = '/tag';
        slugRequestUrl.value = '/vnwa/tag/load-slug';
        break;
    case 'post':
        parentURL.value = '/blog';
        slugRequestUrl.value = '/vnwa/blog/post/load-slug';
        break;
        case 'project':
        parentURL.value = '/project';
        slugRequestUrl.value = '/vnwa/project/load-slug';
        break;
    default:
        break;
}


const nameChange = async () => {

    if (!props.data.meta_title) {
        props.data.meta_title = props.data.name
    }
    props.data.slug = convertToSlug(props.data.name)
    loadSlug()

}
const slugChange = async () => {


    loadSlug()

}

const loadSlug = async () => {
    isSlugLoading.value = true;

    let slug = convertToSlug(props.data.slug);
    await useHttp(`${slugRequestUrl.value}/${slug}`,
        {
            query: {
                locale: locale.value
            },
            onResponse({ response }) {
                if (response.ok) {
                    props.data.slug = response._data.slug
                    isSlugLoading.value = false;

                }
            }
        }
    )
}


const validate = (state: BaseFormType): FormError[] => {
    const errors: FormError[] = [];


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