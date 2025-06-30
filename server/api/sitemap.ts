import { useFetch } from "nuxt/app";
import { useHttp } from "~/composables/useHttp";

interface T {
    slug: string;
    updated_at: string | number | Date;
}

export default defineSitemapEventHandler(async (e) => {
    // Hàm lấy dữ liệu từ API
    async function fetchData(): Promise<T[]> {
        const config = useRuntimeConfig();
        const data= await $fetch<T[]>(`${config.public.apiUrl}/load-data-sitemap`);
        return data;
        
    }

    const posts = await fetchData();

    // Chuyển đổi dữ liệu thành định dạng phù hợp
    const formattedPosts = posts.map((item: T) => ({
        _path: `${item.slug}`,
        modifiedAt: new Date(item.updated_at),
    }));

    // Tạo sitemap từ dữ liệu đã được định dạng
    return Promise.all(formattedPosts.map((item) => ({
        loc: item._path,
        lastmod: item.modifiedAt,
    })));
});