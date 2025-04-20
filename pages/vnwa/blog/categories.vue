<template>
    <div class="grid grid-cols-12 gap-4">
        <!-- Sidebar trái -->
        <div class="col-span-4">
            <UButton label="Create" color="secondary" icon="material-symbols:add-2" class="mb-4"
                @click="showFormCreate()" />

            <Draggable class="mtl-tree capitalize" v-model="treeData" treeLine :defaultOpen="false" :animation="200"
                ghost-class="drag-ghost" drag-class="dragging" @drop="onDrop">
                <template #default="{ node, stat }">
                    <div class="group cursor-pointer relative mx-3 my-1 flex items-center justify-between gap-2 rounded-xl border border-transparent bg-white p-3 shadow-sm transition-all dark:bg-gray-900"
                        :class="{
                            'border-vnwa bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold shadow-md':
                                id_active === node.id,
                            'hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800':
                                id_active !== node.id
                        }">
                        <!-- Tên danh mục -->
                        <div class="flex w-full items-center gap-2" @click="showFormEdit(node.id)">
                            <span class="truncate">{{ node.name }}</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">({{ node.children.length }})</span>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center gap-2">
                            <UButton icon="material-symbols:delete-outline" color="error" size="sm" variant="outline"
                                v-if="id_active === node.id" @click="remove(node.id)" />
                            <OpenIcon v-if="stat.children.length" :open="stat.open"
                                class="text-gray-400 hover:text-gray-600 text-4xl dark:text-gray-500 dark:hover:text-gray-300"
                                @click.native="stat.open = !stat.open" />
                        </div>
                    </div>
                </template>
            </Draggable>
        </div>

        <!-- Phần form bên phải -->
        <div class="col-span-8">
            <div class="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
                <UForm :validate="validate" :state="formData" class="space-y-4" @submit.prevent="onSubmit">
                    <VnwaBaseForm :data="formData.base" @update:errors="handleErrors" type="blog_category">
                        <UCard>
                            <div class="space-y-8">

                                <UFormField label="Image" name="image" required>
                                    <VnwaInputImage v-model="formData.image" />
                                </UFormField>
                                <UFormField label="Banner Image" name="banner_image" required>
                                    <VnwaInputImage v-model="formData.banner_image" />
                                </UFormField>

                                <UFormField label="Is Show" name="is_show" required>
                                    <USwitch v-model="formData.is_show" />
                                </UFormField>
                                <UFormField label="Highlight" name="is_show" required>
                                    <USwitch v-model="formData.is_highlight" />
                                </UFormField>


                                <UFormField label="Description" name="desc" required>
                                    <UTextarea v-model="formData.desc" />
                                </UFormField>
                                <UFormField label="Content" name="content" required>
                                    <VnwaEditor v-model="formData.content" />
                                </UFormField>

                            </div>
                        </UCard>
                    </VnwaBaseForm>
                </UForm>

            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import { walkTreeData } from '@he-tree/vue'
import debounce from 'lodash/debounce'
import type { BaseFormType, BlogCategory } from '~/type'
import type { FormError } from '@nuxt/ui'
import { VnwaInputImage } from '#components'

const toast = useToast()

const treeData = ref([])
const isLoading = ref(false)
const id_active = ref(null);
const errors = ref<FormError[]>([]);
const form_type = ref('create');


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



const { refresh } = useHttp('/vnwa/blog/category/load-tree-data',
    {
        onResponse({ response }) {
            if (response.ok) {
                treeData.value = response._data
            }
        }
    }
)
const updateTreeData = async () => {

    await useHttp('/vnwa/blog/category/update-tree-data', {
        method: 'POST',
        body: { treeData: treeData.value },
        onResponse({ response }) {
            if (response.ok) {
                toast.add({
                    icon: "i-heroicons-check-circle-20-solid",
                    title: response._data.message,
                    color: "success",
                });
            }
        },
    })
}

// Xử lý khi item bị thả
const onDrop = (event) => {
    event.preventDefault();
    updateTreeData()
};


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
        onResponse({ response }) {
            if (response.ok) {
                form_type.value = 'edit';
                formData.id = response._data.id
                formData.parent_id = response._data.parent_id
                formData.base.name = response._data.name
                formData.base.slug = response._data.slug
                formData.image = response._data.image
                formData.desc = response._data.desc
                formData.is_show = response._data.is_show
                formData.is_highlight = response._data.is_highlight
                formData.base.meta_title = response._data.meta_title
                formData.base.meta_desc = response._data.meta_desc
                formData.base.meta_image = response._data.meta_image
                isLoading.value = false;

            }
        }
    })




};

const remove = (id: number) => {

}


const handleErrors = (newErrors: FormError[]) => {
    errors.value = newErrors;
};

const validate = (state: any): FormError[] => {
    if (!state.image) {
        errors.value.push({ name: 'image', message: 'Vui long nhap image' });
    }
    return errors.value;
};
const onSubmit = () => {

}
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