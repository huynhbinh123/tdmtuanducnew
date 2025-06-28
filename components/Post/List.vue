<template>
    <div>
        <ul class="grid grid-cols-2 gap-4">
            <li v-for="(item, index) in data.posts" :key="index">
                <PostItem :item="item" />
            </li>
        </ul>
        <div class="flex items-center justify-center">

            <UPagination color="vnwa" variant="solid" v-model:page="page" :show-controls="false" :items-per-page="data.per_page"
                :total="data.total" show-edges />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/type';

const props = defineProps<{
    type?: 'category' | 'tag';
    value?: any;
}>()

interface T {
    posts: Post[],
    total: number,
    page: number,
    per_page: number
    current_page: number
    last_page: number
}
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

// Page hiện tại lấy từ query
const page = ref(Number(route.query.page) || 1)

// Cập nhật lại query khi page thay đổi
watch(page, (newPage) => {
    router.push({
        query: {
            ...route.query,
            page: newPage.toString()
        }
    })
})

// Tạo params reactive để truyền vào useHttp
const queryParams = computed(() => ({
    locale: locale.value,
    page: page.value,
    parent_type: props.type || '',
    parent_value: props.value || '',
}))

// Gọi API
const { data, status } = await useHttp<T>('load-data-blogs', {
    method: 'GET',
    params: queryParams,
    watch: [queryParams]
})
</script>

<style></style>