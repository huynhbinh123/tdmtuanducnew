<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-4 text-black">
            <div v-if="!isLoading">

                <VnwaTreeCategoryDraggable type="blog_category" :treeData="treeData" :active-id="id_active"
                    @focusItem="showFormEdit" @reload="reload" @show-create="showFormCreate" />
            </div>
        </div>


        <div class="col-span-8">
            <VnwaCard :is-loading="isLoading">
                <UForm ref="formRef" :validate="validate" :state="formData" class="space-y-4 relative"
                    @submit.prevent="onSubmit" @error="onError">
                    <div
                        class="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 sticky top-16 z-10 right-0 bg-white dark:bg-gray-900 w-full ">
                        <div>
                            <h3 class="text-xl font-semibold text-vnwa dark:text-white">
                                {{ formData.id ? 'Form Update' : 'Form Create' }}
                            </h3>
                        </div>
                        <div class="flex items-center justify-end  gap-4">

                            <VnwaGroupLang v-if="formData.id" :locale="locale" @update:locale="changeLocale($event)" />
                            <UButton  aria-label="Vinawebapp Button"  type="submit" :label="$t('vnwa.save')" :loading="isLoading"
                                icon="mdi:content-save" />
                        </div>
                    </div>
                    <VnwaBaseForm :data="formData.base" @update:errors="handleErrors" type="blog_category">
                        <UCard>
                            <div class="space-y-8">
                                <UFormField label="Image" name="image">
                                    <VnwaInputImage v-model="formData.image" />
                                </UFormField>
                                <UFormField label="Banner Image" name="banner_image">
                                    <VnwaInputImage v-model="formData.banner_image" />
                                </UFormField>
                                <UFormField label="Is Show" name="is_show">
                                    <USwitch v-model="formData.is_show" />
                                </UFormField>
                                <UFormField label="Highlight" name="is_show">
                                    <USwitch v-model="formData.is_highlight" />
                                </UFormField>
                                <UFormField label="Description" name="desc">
                                    <UTextarea v-model="formData.desc" />
                                </UFormField>
                                <UFormField label="Content" name="content">
                                    <VnwaEditor v-model="formData.content" />
                                </UFormField>

                            </div>
                        </UCard>
                    </VnwaBaseForm>

                </UForm>

            </VnwaCard>
        </div>
    </div>

</template>

<script lang="ts" setup>

import type { BaseFormType, BlogCategory } from '~/type'
import type { FormError, FormErrorEvent } from '@nuxt/ui'
import { VnwaInputImage } from '#components'
definePageMeta({
    title: 'Blog Category'
})
const toast = useToast()

const treeData = ref([])
const isLoading = ref(false)
const id_active = ref(null);
const errors = ref<FormError[]>([]);
const form_type = ref('create');
const { t, locale: i18nLocale } = useI18n();
const locale = ref<string>(useRuntimeConfig().public.appLang);


const formData = reactive({
    id: null,
    parent_id: null,
    base: <BaseFormType>{
        name: '',
        slug: '',
        meta_title: '',
        meta_image: '',
        meta_desc: ''
    },
    image: '',
    banner_image: '',
    desc: '',
    content: '',
    is_show: true,
    is_highlight: false,

})
const loadTreeData = () => {
    isLoading.value = true
    useHttp('/vnwa/blog/category/load-tree-data',
        {
            query: {
                locale: locale.value
            },
            onResponse({ response }) {
                if (response.ok) {
                    treeData.value = response._data
                    isLoading.value = false
                }
            }
        }
    )

}



const reload = async () => {
    await loadTreeData();
    showFormCreate();
}

reload();
const showFormCreate = () => {
    clearError();
    isLoading.value = true
    id_active.value = null
    setTimeout(() => {
        form_type.value = 'create';
        formData.id = null
        formData.parent_id = null
        formData.base.name = ''
        formData.base.slug = ''
        formData.image = ''
        formData.banner_image = ''

        formData.desc = ''
        formData.is_show = true
        formData.is_highlight = false
        formData.base.meta_title = ''
        formData.base.meta_image = ''
        formData.base.meta_desc = ''
        isLoading.value = false

    }, 100);

}
const showFormEdit = async (id: number) => {

    isLoading.value = true
    id_active.value = id
    clearError();

    await useHttp(`/vnwa/blog/category/detail/${id}`, {
        query: {
            locale: locale.value
        },
        onResponse({ response }) {
            if (response.ok) {
                form_type.value = 'edit';
                formData.id = id
                formData.parent_id = response._data.category.parent_id
                formData.image = response._data.category.image
                formData.banner_image = response._data.category.banner_image
                formData.is_highlight = response._data.category.is_highlight == 1 ? true : false;
                formData.is_show = response._data.category.is_show == 1 ? true : false;
                formData.base.name = response._data.translation.name
                formData.base.slug = response._data.translation.slug
                formData.desc = response._data.translation.desc
                formData.base.meta_title = response._data.translation.meta_title
                formData.base.meta_desc = response._data.translation.meta_desc
                formData.base.meta_image = response._data.translation.meta_image
                isLoading.value = false;

            }
        }
    })




};
const changeLocale = ($event: string) => {
    locale.value = $event;
    showFormEdit(id_active.value);
    loadTreeData();
}


const handleErrors = (newErrors: FormError[]) => {
    errors.value = newErrors;
};

const formRef = ref()

const pushServerErrors = (serverErrors: Record<string, string[]>) => {
    const errors: FormError[] = []

    Object.keys(serverErrors).forEach((field) => {
        errors.push({
            name: field,
            message: serverErrors[field][0]
        })
    })

    formRef.value?.setErrors(errors) // 🪄 Hiển thị lỗi lên UI luôn
}
async function onError(event: FormErrorEvent) {
    console.log('error')
    if (event?.errors?.[0]?.id) {
        const element = document.getElementById(event.errors[0].id)
        element?.focus()
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}
const validate = (state: any): FormError[] => {
    if (!state.base.name || state.base.name.length > 500) {
        errors.value.push({ name: 'name', message: t('vnwa.error_message.name.required') });
    }
    if (!state.base.slug || state.base.slug.length > 500) {
        errors.value.push({ name: 'slug', message: t('vnwa.error_message.slug.required') });
    }

    // if (!state.base.meta_title || state.base.meta_title.length > 100) {
    //     errors.value.push({ name: 'meta_title', message: t('vnwa.error_message.meta.title') });
    // }

    // if (!state.base.meta_desc || state.base.meta_desc.length > 300) {
    //     errors.value.push({ name: 'meta_desc', message: t('vnwa.error_message.meta.desc') });
    // }

    // if (!state.base.meta_image || state.base.meta_image.length < 5) {
    //     errors.value.push({ name: 'meta_image', message: t('vnwa.error_message.meta.image') });
    // }



    return errors.value;
};
const onSubmit = async () => {
    clearError();
    isLoading.value = true;
    const payload = {
        name: formData.base.name,
        slug: formData.base.slug,
        image: formData.image,
        banner_image: formData.banner_image,
        desc: formData.desc,
        content: formData.content,
        is_show: formData.is_show,
        is_highlight: formData.is_highlight,
        meta_title: formData.base.meta_title,
        meta_image: formData.base.meta_image,
        meta_desc: formData.base.meta_desc,


    }
    const url = form_type.value === 'create'
        ? '/vnwa/blog/category/store'
        : `/vnwa/blog/category/update/${formData.id}`;
    await useHttp(url, {
        method: 'POST',
        query: {
            locale: locale.value
        },
        body: payload,
        onResponse({ response }) {
            if (response.ok) {
                toast.add({
                    icon: "i-heroicons-check-circle-20-solid",
                    title: response._data.message || 'Lưu thành công!',
                    color: "success",
                });
                // Làm mới tree và form
                loadTreeData();
                if (form_type.value === 'edit') {
                    id_active.value = response._data.category.id;

                } else {
                    showFormCreate();

                }

            } else {
                if (response.status == 422) {
                    pushServerErrors(response._data.errors)
                }

                toast.add({
                    icon: "i-heroicons-x-circle-20-solid",
                    title: "Lỗi",
                    description: response._data?.message || 'Có lỗi xảy ra.',
                    color: "error",
                });

            }
            isLoading.value = false;
        },
        onFetchError({ error }) {
            toast.add({
                icon: "i-heroicons-x-circle-20-solid",
                title: "Lỗi mạng",
                description: error?.message || 'Không thể kết nối máy chủ.',
                color: "error",
            });
            isLoading.value = false;
        }
    });
};



</script>

<style scoped>
.drag-ghost {
    opacity: 0.5 !important;
    background-color: rgba(59, 130, 246, 0.1) !important;
    /* Tailwind blue-500/10 */
    border: 1px dashed #3b82f6 !important;
}

.dragging {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>