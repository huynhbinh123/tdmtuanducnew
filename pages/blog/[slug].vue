<template>
  <UContainer>
    <!-- Lg -->
    <div class="lg:block hidden">
      <div class="grid grid-cols-6 gap-16 mt-6">
        <div class="col-span-2">
          <div>
            <div
              v-for="(name, index) in Categories"
              :key="index"
              class="mb-4 cursor-pointer"
            >
              <h3
                class="text-black text-lg font-medium uppercase py-4 border-t-4 border-orange-600"
              >
                {{ name.name }}
              </h3>

              <ul
                v-if="name.name === 'bài viết mới'"
                class="list-disc pl-5 space-y-1 text-orange-500"
              >
                <li
                  v-for="(child, index) in name.child"
                  :key="index"
                  class="text-orange-500 hover:text-gray-700 leading-snug"
                >
                  <NuxtLinkLocale
                    :to="`/blog/${child.slug}`"
                    class="text-inherit no-underline hover:text-gray-700 line-clamp-2"
                  >
                    {{ child.name }}
                  </NuxtLinkLocale>
                </li>
              </ul>

              <ul v-else class="space-y-1">
                <li v-for="(item, index) in flattenedCategories" :key="index">
                  <TreeNavItem
                    :item="item"
                    :expandedSlug="null"
                    @toggle="$emit('toggle', $event)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <h2
            class="text-2xl font-semibold text-black border-b border-gray-200 py-4"
          >
            {{ $t("category.title") }}: {{ selectedCategory }}
          </h2>
          <p class="text-black">
            Chậu rửa chén (bồn rửa bát) là khu vực hoạt động gần như liên tục
            trong căn bếp, không chỉ phục vụ rửa thực phẩm, chén đĩa mà còn ảnh
            hưởng đến thẩm mỹ và sự tiện nghi chung. Hafele – thương hiệu danh
            tiếng toàn cầu đến từ Đức, nổi tiếng với các giải pháp phụ kiện nội
            thất, thiết bị bếp và gia dụng chất lượng cao- mang đến dòng sản
            phẩm chậu rửa chén đáp ứng những tiêu chuẩn khắc khe về độ bền, tính
            năng và thiết kế tinh tế.
          </p>
          <UCollapsible class="flex flex-col gap-2 w-full">
            <UButton
              :label="$t('category.comment')"
              class="bg-orange-500 text-white uppercase text-xl cursor-pointer hover:bg-orange-400 line-clamp-none mx-auto"
            />

            <template #content>
              <form class="space-y-4 p-4" @submit.prevent="submitReview">
                <p class="text-black text-xl font-bold">
                  {{ $t("category.comment_section.leave_comment") }}
                </p>
                <p class="text-gray-500 text-sm">
                  {{ $t("category.comment_section.note") }}
                </p>
                <!-- Nội dung bình luận -->
                <div>
                  <label class="font-medium text-sm text-black"
                    >{{ $t("category.comment_section.comment")
                    }}<span class="text-red-500">*</span></label
                  >
                  <textarea
                    v-model="form.comment"
                    rows="6"
                    class="w-full border border-gray-300 p-2 rounded resize-none text-black hover:border-orange-400 focus:border-orange-400 focus:outline-none"
                    :placeholder="$t('product.comment')"
                  ></textarea>
                  <p v-if="errors.comment" class="text-red-500 text-sm mt-1">
                    {{ errors.comment }}
                  </p>
                </div>
                <!-- Tên và Email -->
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-sm text-black"
                    >{{ $t("category.comment_section.name")
                    }}<span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="border border-gray-300 hover:border-orange-400 focus:border-orange-400 focus:outline-none p-2 rounded w-full text-black"
                    :placeholder="$t('category.errors.name')"
                  />
                  <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                    {{ errors.name }}
                  </p>

                  <label class="font-medium text-sm text-black"
                    >{{ $t("category.comment_section.email")
                    }}<span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    class="border border-gray-300 hover:border-orange-400 focus:border-orange-400 focus:outline-none p-2 rounded w-full text-black"
                    :placeholder="$t('category.comment_section.email')"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                    {{ errors.email }}
                  </p>
                  <label class="font-medium text-sm text-black">{{
                    $t("category.comment_section.website")
                  }}</label>
                  <input
                    v-model="form.website"
                    type="text"
                    class="border border-gray-300 hover:border-orange-400 focus:border-orange-400 focus:outline-none p-2 rounded w-full text-black"
                  />
                </div>

                <!-- Nút hành động -->
                <div class="flex justify-end gap-2 mt-4">
                  <UButton
                    type="submit"
                    class="bg-orange-500 text-white font-bold cursor-pointer hover:bg-orange-600 focus:border-orange-400 focus:outline-none transition-colors p-3"
                    >{{ $t("category.comment_section.submit") }}
                  </UButton>
                </div>
              </form>
            </template>
          </UCollapsible>
        </div>
      </div>
    </div>

    <!-- Moblie -->
    <div class="lg:hidden block">
      <div class="gap-16 mt-6">
        <div>
          <h2
            class="text-2xl font-semibold text-black border-b border-gray-200 py-4"
          >
            {{ $t("category.title") }}: {{ selectedCategory }}
          </h2>
          <p class="text-black">
            Chậu rửa chén (bồn rửa bát) là khu vực hoạt động gần như liên tục
            trong căn bếp, không chỉ phục vụ rửa thực phẩm, chén đĩa mà còn ảnh
            hưởng đến thẩm mỹ và sự tiện nghi chung. Hafele – thương hiệu danh
            tiếng toàn cầu đến từ Đức, nổi tiếng với các giải pháp phụ kiện nội
            thất, thiết bị bếp và gia dụng chất lượng cao- mang đến dòng sản
            phẩm chậu rửa chén đáp ứng những tiêu chuẩn khắc khe về độ bền, tính
            năng và thiết kế tinh tế.
          </p>
          <UCollapsible class="flex flex-col gap-2 w-full my-4">
            <UButton
              label="Viết bình luận"
              class="bg-orange-500 text-white uppercase text-xl cursor-pointer hover:bg-orange-400 line-clamp-none mx-auto"
            />

            <template #content>
              <form class="space-y-4 p-4" @submit.prevent="submitReview">
                <p class="text-black text-xl font-bold">Để lại một bình luận</p>
                <p class="text-gray-500 text-sm">
                  Email của bạn sẽ không được hiển thị công khai. Các trường bắt
                  buộc được đánh dấu *
                </p>
                <!-- Nội dung bình luận -->
                <div>
                  <label class="font-medium text-sm text-black"
                    >Đánh giá / Bình luận<span class="text-red-500"
                      >*</span
                    ></label
                  >
                  <textarea
                    v-model="form.comment"
                    rows="6"
                    class="w-full border border-gray-300 p-2 rounded resize-none text-black hover:border-orange-400 focus:border-orange-400 focus:outline-none"
                    placeholder="Nhập đánh giá hoặc bình luận của bạn"
                  ></textarea>
                  <p v-if="errors.comment" class="text-red-500 text-sm mt-1">
                    {{ errors.comment }}
                  </p>
                </div>
                <!-- Tên và Email -->
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-sm text-black"
                    >Tên<span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="border border-gray-300 hover:border-orange-400 focus:border-orange-400 focus:outline-none p-2 rounded w-full text-black"
                    placeholder="Nhập tên của bạn"
                  />
                  <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                    {{ errors.name }}
                  </p>

                  <label class="font-medium text-sm text-black"
                    >E-mail<span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    class="border border-gray-300 hover:border-orange-400 focus:border-orange-400 focus:outline-none p-2 rounded w-full text-black"
                    placeholder="Nhập email của bạn"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                    {{ errors.email }}
                  </p>
                  <label class="font-medium text-sm text-black"
                    >Trang web:</label
                  >
                  <input
                    v-model="form.website"
                    type="text"
                    class="border border-gray-300 hover:border-orange-400 focus:border-orange-400 focus:outline-none p-2 rounded w-full text-black"
                  />
                </div>

                <!-- Nút hành động -->
                <div class="flex justify-end gap-2 mt-4">
                  <UButton
                    type="submit"
                    class="bg-orange-500 text-white font-bold cursor-pointer hover:bg-orange-600 focus:border-orange-400 focus:outline-none transition-colors p-3"
                    >Gửi
                  </UButton>
                </div>
              </form>
            </template>
          </UCollapsible>
        </div>
        <div>
          <div
            v-for="(name, index) in Categories"
            :key="index"
            class="mb-4 cursor-pointer"
          >
            <h3
              class="text-black text-lg font-medium uppercase py-4 border-t-4 border-orange-600"
            >
              {{ name.name }}
            </h3>

            <ul
              v-if="name.name === 'bài viết mới'"
              class="list-disc pl-5 space-y-1 text-orange-500"
            >
              <li
                v-for="(child, index) in name.child"
                :key="index"
                class="text-orange-500 hover:text-gray-700 leading-snug"
              >
                <template>
                  <span
                    class="text-inherit no-underline hover:text-gray-700 line-clamp-2 cursor-pointer"
                    @click="handleClick(child.name, child.slug)"
                  >
                    {{ child.name }}
                  </span>
                </template>
              </li>
            </ul>

            <ul v-else class="space-y-1">
              <li v-for="(item, index) in flattenedCategories" :key="index">
                <TreeNavItem
                  :item="item"
                  :expandedSlug="null"
                  @toggle="$emit('toggle', $event)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
const { t } = useI18n();
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSeoMeta } from "#imports";
import { useMockData } from "~/composables/useMockData";
import TreeNavItem from "~/components/TreeNavItem.vue";

interface CategoryItem {
  name: string;
  slug: string;
  child?: CategoryItem[];
}

const { categoryMenu, Categories } = useMockData();

const hoverIndex = ref<number | null>(null);
const route = useRoute();
const router = useRouter();

const selectedCategory = computed(() => {
  const path = route.path;
  const slug = path.split("/").filter(Boolean).pop();

  function findCategoryName(
    menu: (
      | { name: string; child: { name: string; slug: string }[] }
      | {
          name: string;
          child: {
            name: string;
            slug: string;
            child: (
              | {
                  name: string;
                  slug: string;
                  child: { name: string; slug: string }[];
                }
              | { name: string; slug: string; child?: undefined }
            )[];
          }[];
        }
    )[]
  ) {
    for (const group of menu) {
      if (group.child) {
        for (const item of group.child) {
          if (item.slug === slug) return item.name;
          if ("child" in item && Array.isArray(item.child)) {
            const subItem = item.child.find((sub) => sub.slug === slug);
            if (subItem) return subItem.name;
          }
        }
      }
    }
    return t("category.noTitle");
  }

  return findCategoryName(Categories);
});

const expandedIndexMobile = ref<number | null>(null);
const expandedIndex = ref<number | null>(null);

onMounted(() => {
  for (let i = 0; i < Categories.length; i++) {
    const group = Categories[i];
    for (let j = 0; j < group.child.length; j++) {
      const child = group.child[j];

      const isMatch =
        child.name === selectedCategory.value ||
        ("child" in child &&
          Array.isArray(child.child) &&
          child.child.some((sub) => sub.name === selectedCategory.value));

      if (isMatch) {
        expandedIndex.value = j;
        expandedIndexMobile.value = j;
        return;
      }
    }
  }
});

function toggleExpand(index: number) {
  if (window.innerWidth >= 1024) {
    expandedIndex.value = expandedIndex.value === index ? null : index;
  } else {
    expandedIndexMobile.value =
      expandedIndexMobile.value === index ? null : index;
  }
}

definePageMeta({
  layout: "blog",
});

const isOpen = ref<boolean>(false);

const form = ref({
  name: "",
  email: "",
  website: "",
  comment: "",
});

interface Errors {
  name?: string;
  email?: string;
  comment?: string;
}

const errors = ref<Errors>({});

const submitReview = () => {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = t("category.comment_section.errors.name");
  }

  if (!form.value.email.trim()) {
    errors.value.email = t("category.comment_section.errors.email_required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = t("category.comment_section.errors.email_invalid");
  }

  if (!form.value.comment.trim()) {
    errors.value.comment = t("category.comment_section.errors.comment");
  }

  if (Object.keys(errors.value).length === 0) {
    console.log("Dữ liệu người dùng nhập:", form.value);
    form.value = {
      name: "",
      email: "",
      website: "",
      comment: "",
    };
  }
};

interface TreeNavItemType {
  name: string;
  slug: string;
  child?: TreeNavItemType[];
}

const flattenedCategories = computed<TreeNavItemType[]>(() =>
  Categories.flatMap((item) => {
    const name = item.name.toLowerCase();
    if (item.name.toLowerCase() === t("category.new_posts").toLowerCase()) {
      return [];
    }
    if (name === t("category.title").toLowerCase()) {
      return (item.child || []) as TreeNavItemType[];
    }
    return [item as TreeNavItemType];
  })
);

// SEO Meta Title
const seoTitle = ref(t("category.title"));

useSeoMeta({
  title: () => seoTitle.value || t("category.title"),
});

// Tự động cập nhật tiêu đề theo route
watch(
  () => route.params.slug,
  (slug) => {
    if (!slug) return;

    for (const group of Categories) {
      for (const child of group.child || []) {
        if (child.slug === slug) {
          seoTitle.value = child.name;
          return;
        }
        if ("child" in child && Array.isArray(child.child)) {
          const sub = child.child.find((s) => s.slug === slug);
          if (sub) {
            seoTitle.value = sub.name;
            return;
          }
        }
      }
    }

    seoTitle.value = t("category.title");
  },
  { immediate: true }
);

// Chuyển trang khi click danh mục
function handleClick(name: string, slug: string) {
  router.push(`/blog/${slug}`);
}
</script>
