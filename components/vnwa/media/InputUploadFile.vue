<script lang="ts" setup>
const props = defineProps({
    basePath: String
})


const emit = defineEmits(['success'])

const inputRef = ref();
const loading = ref(false);

const onSelect = async (e: any) => {
    const files = e.target.files;
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
    }
    if (totalSize > 41943040) {
        // Nếu tổng kích thước vượt quá giới hạn
        return useToast().add({
            title: "File is too large.",
            color: "error",
            icon: "i-heroicons-exclamation-circle-solid",
        });
    }

    loading.value = true;

    const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files[]", files[i]);
        }


    await useHttp("vnwa/media/upload-files", {
        method: "POST",
        body: formData,
        params: {
            basePath: props.basePath,
        },
        ignoreResponseError: true,
        onResponse({ response }) {
            if (response.status !== 200) {
                useToast().add({
                    icon: 'i-heroicons-exclamation-circle-solid',
                    color: 'error',
                    title: response._data?.message ?? response.statusText ?? 'Something went wrong',
                });
            } else{
                emit('success')
            }

            loading.value = false;
            if (inputRef.value) {
                inputRef.value.value = '';
            }
        },
    });
};
</script>

<template>
    <UTooltip text="Upload File" :popper="{ arrow: true }">
        <UButton :loading="loading" @click="inputRef.click()" icon="i-heroicons:cloud-arrow-up-16-solid" color="success"
            variant="outline" />
        <input ref="inputRef" type="file" class="hidden" multiple @change="onSelect" />
    </UTooltip>
</template>
