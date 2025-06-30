<template>
    <div>
        <ul class="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <li v-for="(item, index) in data.projects" :key="index">
                <ProjectItem :item="item" />
            </li>
        </ul>
        <div class="flex items-center justify-center">

            <UPagination color="vnwa" variant="solid" v-model:page="page" :show-controls="false" :items-per-page="data.per_page"
                :total="data.total" show-edges />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type {  Project } from '~/type';


interface T {
    projects: Project[],
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
}))

// Gọi API
const { data, status } = await useHttp<T>('load-data-projects', {
    method: 'GET',
    params: queryParams,
    watch: [queryParams]
})
</script>

<style></style>