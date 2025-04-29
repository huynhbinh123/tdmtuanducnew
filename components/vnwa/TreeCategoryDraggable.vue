<template>
    <div>
        <div
            class="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700  bg-white dark:bg-gray-900 w-full mb-4 ">
            <div>
                <h3 class="text-xl font-semibold text-vnwa dark:text-white capitalize">
                    {{ $t(subData.name) }}
                </h3>
            </div>
            <div class="flex items-center justify-end gap-2">
                <UButton label="Create" color="secondary" icon="material-symbols:add-2" @click="showCreate()" />
            </div>
        </div>
        <Draggable v-model="tree" class="mtl-tree capitalize" treeLine :defaultOpen="true" :animation="200"
            ghost-class="drag-ghost" drag-class="dragging" @drop="onDrop">
            <template #default="{ node, stat }">
                <div class="group cursor-pointer relative mx-3 my-1 flex items-center justify-between gap-2 rounded-xl border border-transparent bg-white p-3 shadow-sm transition-all dark:bg-gray-900"
                    :class="{
                        'border-vnwa bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold shadow-md':
                            activeId === node.id,
                        'hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800':
                            activeId !== node.id
                    }">
                    <!-- Tên danh mục -->
                    <div class="flex w-full items-center gap-2" @click="focusItem(node.id)">
                        <span class="truncate">{{ node.name }}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">({{ node.children.length }})</span>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-2">
                        <UButton icon="material-symbols:delete-outline" color="error" size="sm" variant="outline"
                            v-if="activeId === node.id" @click="remove(node.id, node.name)" />
                        <OpenIcon v-if="stat.children.length" :open="stat.open"
                            class="text-gray-400 hover:text-gray-600 text-4xl dark:text-gray-500 dark:hover:text-gray-300"
                            @click.native="stat.open = !stat.open" />
                    </div>
                </div>
            </template>
        </Draggable>
    </div>
</template>

<script setup lang="ts">
import { VnwaModalDeleteCategory } from '#components';
import { Draggable, OpenIcon } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    activeId: {
        type: Number,
        default: null
    },
    type: String
})
const subData = reactive({
    name: '',
    url_delete: "",
    url_update: ""
});

switch (props.type) {
    case 'blog_category':
        subData.name = 'blog category'
        subData.url_delete = '/vnwa/blog/category/delete'
        subData.url_update = '/vnwa/blog/category/update-tree-data'
        break;

    default:
        break;
}

const overlay = useOverlay()

const toast = useToast();

const emit = defineEmits(['update:modelValue', 'focusItem', 'reload', 'showCreate'])
const tree = ref([...props.modelValue])
watch(
    () => props.modelValue,
    (val) => {
        tree.value = [...val]
    }
)

const showCreate = () => {

    emit('showCreate')
}
const onDrop = () => {
    updateTreeData()
}
const focusItem = (id: number) => {
    emit('focusItem', id)
}

const remove = (id: number, name: string) => {
    const modal = overlay.create(VnwaModalDeleteCategory);
    modal.open({
        url: subData.url_delete,
        id: id,
        name: name,
        onSuccess() {
            modal.close();
            emit('reload')

        }
    })

}
const updateTreeData = async () => {

    await useHttp(subData.url_update, {
        method: 'POST',
        body: { treeData: tree.value },
        onResponse({ response }) {
            if (response.ok) {
                emit('reload')

                toast.add({
                    icon: "i-heroicons-check-circle-20-solid",
                    title: response._data.message,
                    color: "success",
                });
            }
        },
    })
}

</script>

<style scoped>
/* Tuỳ chỉnh CSS nếu cần */
</style>