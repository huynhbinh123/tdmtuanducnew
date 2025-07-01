<template>
  <div>
    <div class="max-w-8xl mx-auto">
      <VnwaCard :id="route.params.id" :is-loading="isLoading">
        <UForm ref="formRef" :validate="validate" :state="formData" class="space-y-4 relative"
          @submit.prevent="onSubmit" @error="onError">
          <div
            class="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 sticky top-16 z-10 right-0 bg-white dark:bg-gray-900 w-full ">
            <div>
              <h3 class="text-xl font-semibold text-vnwa dark:text-white">
                {{ t('vnwa.edit_project') }}
              </h3>


            </div>
            <div class="flex items-center justify-end gap-6">
              <VnwaGroupLang :locale="locale" @update:locale="changeLocale($event)" />

              <UButton  aria-label="Vinawebapp Button"  type="submit" :label="$t('vnwa.save')" :loading="isLoading" icon="mdi:content-save" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-8">
              <VnwaBaseForm :data="formData.base" @update:errors="handleErrors" type="project">
                <UCard>
                  <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Company Logo" name="logo" required>
                      <VnwaInputImage v-model="formData.logo" />
                    </UFormField>
                    <UFormField label="Company Domain" name="domain">
                      <UInput v-model="formData.domain" />
                    </UFormField>
                  </div>
                </UCard>
                <UCard>

                  <div class="grid grid-cols-2 gap-4">

                    <UFormField label="Before Image" name="before_image">
                      <VnwaInputImage v-model="formData.before_image" />
                    </UFormField>
                    <UFormField label="After Image" name="after_image">
                      <VnwaInputImage v-model="formData.after_image" />
                    </UFormField>
                  </div>
                </UCard>
                <UCard>
                  <div class="space-y-8">

                    <div class="grid grid-cols-2 gap-4">
                      <UFormField label="Image" name="image" required>
                        <VnwaInputImage v-model="formData.image" />
                      </UFormField>
                      <UFormField label="Banner Image" name="banner_image">
                        <VnwaInputImage v-model="formData.banner_image" />
                      </UFormField>


                    </div>




                  </div>
                </UCard>
                <UCard>
                  <div class="space-y-8">


                    <UFormField label="Description" name="desc">
                      <UTextarea v-model="formData.desc" />
                    </UFormField>
                    <UFormField required label="Content" name="content">
                      <VnwaEditor v-model="formData.content" />
                    </UFormField>

                    <UFormField required label="Objective" name="objective">
                      <VnwaEditor v-model="formData.objective" />
                    </UFormField>
                    <UFormField required label="Approach" name="approach">
                      <VnwaEditor v-model="formData.approach" />
                    </UFormField>
                    <UFormField required label="Impact" name="impact">
                      <VnwaEditor v-model="formData.impact" />
                    </UFormField>
                    <UFormField required label="Results" name="results">
                      <VnwaEditor v-model="formData.results" />
                    </UFormField>


                  </div>

                </UCard>
                <UCard>
                  <UFormField label="Gallery">
                    <VnwaInputImages v-model="formData.galery" />
                  </UFormField>

                </UCard>
              </VnwaBaseForm>
            </div>
            <div class="col-span-4 space-y-8">
              <UCard>
                <div class="grid grid-cols-3 gap-8">
                  <UFormField label="Is Show" name="is_show">
                    <USwitch v-model="formData.is_show" />
                  </UFormField>
                  <UFormField label="Highlight" name="is_show">
                    <USwitch v-model="formData.is_highlight" />
                  </UFormField>
                </div>
              </UCard>
              <UCard>
                <template #header>
                  <h3 class="text-lg font-semibold">{{ $t('vnwa.tag') }} </h3>
                </template>
                <VnwaTagOptions v-model="formData.tagIds" />

              </UCard>
            </div>
          </div>


        </UForm>

      </VnwaCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormErrorEvent } from '@nuxt/ui';
import type { BaseFormType } from '~/type';

definePageMeta({
  title: 'Edit Project'
})
interface T {
  base: BaseFormType;
  domain: string;
  image: string;
  banner_image: string;
  logo: string;
  before_image: string;
  after_image: string;
  is_show: boolean;
  is_highlight: boolean;
  desc: string;
  content: string;
  objective: string;
  approach: string;
  impact: string;
  results: string;
  galery: string[];
  tagIds: number[];
}
const { t, locale: localeBase } = useI18n();
const toast = useToast();
const locale = ref<string>(localeBase.value);

const changeLocale = ($event: string) => {
  locale.value = $event;
}

const errors = ref<FormError[]>([]);
const formRef = ref()
const isLoading = ref(false)
const formData = ref<T>({
  base: {
    name: '',
    slug: '',
    meta_title: '',
    meta_image: '',
    meta_desc: ''
  },
  domain: '',
  image: '',
  banner_image: '',
  logo: '',
  before_image: '',
  after_image: '',
  is_show: true,
  is_highlight: false,
  desc: '',
  content: '',
  objective: '',
  approach: '<h6><strong>Vinawebapp.com</strong> áp dụng phương pháp tiếp cận tỉ mỉ, thực hành để đáp ứng các nhu cầu độc đáo của <strong>TEN_COMPANY</strong>. Dự án được khởi xướng bằng các hội thảo toàn diện và các phiên tương tác trực tiếp cho phép nhóm phát triển nắm bắt và chuyển đổi hoàn toàn tầm nhìn của khách hàng thành một thiết kế chức năng. Các cuộc kiểm tra hàng tuần thường xuyên được thiết lập để đảm bảo phù hợp với kỳ vọng của khách hàng và thực hiện các điều chỉnh kịp thời dựa trên phản hồi đang diễn ra. Chiến lược kỹ thuật tập trung vào việc sử dụng các công cụ thiết kế chất lượng cao như Adobe XD để tạo giao diện người dùng và trải nghiệm người dùng, Adobe Photoshop và Illustrator để tạo các thành phần đồ họa hấp dẫn, Adobe Premier để chỉnh sửa và tích hợp video có độ phân giải cao và Slickplan để sắp xếp cấu trúc trang web hiệu quả. Một khía cạnh quan trọng của dự án là sử dụng framew NuxtJS để thiết kế giao diện trang web để hợp lý hóa quy trình <strong>SEO</strong> và tăng cường tương tác của người dùng.</h6>',
  impact: '<h6>Việc cải tổ toàn diện trang web Vinawebapp.com đã giải quyết trực tiếp và khắc phục những thách thức ban đầu gặp phải:</h6><ul><li><p><strong>Trải nghiệm người dùng:</strong> Thiết kế trang web mới đã loại bỏ hành trình người dùng bị phân mảnh trước đây, thiết lập một con đường dễ dàng, trôi chảy để đặt chỗ. Giao diện được đơn giản hóa, giúp người dùng thân thiện và giảm đáng kể thời gian và công sức cần thiết để điều hướng trang web.</p></li><li><p><strong>Tích hợp chức năng:</strong> Hệ thống mới cần tích hợp các chức năng như lịch, bản đồ và giao diện đặt phòng tốt hơn. Tích hợp này loại bỏ nhu cầu rườm rà phải truy cập nhiều trang phụ để hoàn tất đặt phòng, do đó nâng cao hiệu quả của hành trình người dùng.</p></li><li><p><strong>Các yếu tố thẩm mỹ và tương tác:</strong> Trang web được làm phong phú với nhiều hình ảnh động tùy chỉnh và video chất lượng cao, giới thiệu động các cuộc phiêu lưu của <strong>TEN_CONG_TY</strong>. Các yếu tố này được tối ưu hóa để đảm bảo hiệu suất nhất quán trên cả nền tảng máy tính để bàn và thiết bị di động, do đó mở rộng khả năng truy cập và sức hấp dẫn của trang web.</p></li></ul>',
  results: '<p><span>Trang web được thiết kế lại đã được ra mắt với những đánh giá tích cực và chứng minh những cải tiến ngay lập tức trong số liệu về mức độ tương tác của người dùng. Việc tích hợp nội dung trực quan hấp dẫn và điều hướng hợp lý đã làm tăng đáng kể sức hấp dẫn của trang web, dẫn đến tỷ lệ giữ chân khách truy cập và tỷ lệ chuyển đổi cao hơn. Các kết quả trực tiếp bao gồm sự gia tăng trong các lượt đặt phòng thông qua trang web, tăng thời gian dành cho các trang khác nhau và cải thiện tốc độ trang tổng thể—tất cả đều là những chỉ số quan trọng của một thiết kế lại trang web thành công. <strong>TEN_CONG_TY</strong> đã đạt được sự hiện diện trực tuyến hấp dẫn và hiệu quả hơn, do đó củng cố vị thế của mình như một thế lực tiên phong trong ngành </span><strong>LINH_VUC_KINH_DOANH </strong><span>mạo hiểm.&nbsp;</span></p><p><span>Bằng cách cung cấp một giải pháp được thiết kế riêng vượt ra ngoài các nhu cầu chức năng cơ bản, </span><a target="_blank" rel="noopener noreferrer" title="Vnwa Link" href="http://Vinawebapp.com">Vinawebapp.com</a> <span> đã giúp <strong>TEN_CONG_TY</strong> hiện thực hóa một sự chuyển đổi mang tính tầm nhìn cho cổng thông tin trực tuyến của mình. Do đó, công ty đã thiết lập một chuẩn mực mới về sự tham gia của người dùng và tiếp thị kỹ thuật số trong lĩnh vực <strong>LINH_VUC_KINH_DOANH</strong>. Không còn nghi ngờ gì nữa, trang web mới sẽ truyền cảm hứng cho cả những nhà thám hiểm mới và cũ.</span></p>',
  galery: [],
  tagIds: []
})
const route = useRoute()
const { data, status, refresh } = await useHttp<T>('vnwa/project/detail/' + route.params.id, {
  query: computed(() => ({
    locale: locale.value
  })),
  watch: [locale],
  onResponse({ response }) {
    formData.value = response._data;

  }
})
formData.value = data.value;

const reset = () => {
  formData.value.base.name = ''
  formData.value.base.slug = ''
  formData.value.base.meta_title = ''
  formData.value.base.meta_image = ''
  formData.value.base.meta_desc = ''
  formData.value.image = ''
  formData.value.banner_image = ''
  formData.value.is_show = true
  formData.value.is_highlight = false
  formData.value.desc = ''
  formData.value.content = ''
  formData.value.objective = ''
  formData.value.approach = ''
  formData.value.impact = ''
  formData.value.results = ''
  formData.value.galery = []
}

const handleErrors = (newErrors: FormError[]) => {
  errors.value = newErrors;
};

const pushServerErrors = (serverErrors: Record<string, string[]>) => {
  const errors: FormError[] = []

  Object.keys(serverErrors).forEach((field) => {
    errors.push({
      name: field,
      message: serverErrors[field][0]
    })
  })

  formRef.value?.setErrors(errors)
}
async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
const validate = (state: any): FormError[] => {


  // if (state.domain && state.domain.length > 100) {
  //   errors.value.push({ name: 'domain', message: 'Tên miền không được quá 100 ký tự.' });
  // }
  // if (!state.logo || state.logo.length > 500) {
  //   errors.value.push({ name: 'logo', message: 'Logo không được để trống hoặc quá dài.' });
  // }
  // if (!state.image || state.image.length > 500) {
  //   errors.value.push({ name: 'image', message: 'Hình ảnh không được để trống hoặc quá dài.' });
  // }


  // if (!state.content ) {
  //   errors.value.push({ name: 'content', message: 'Nội dung không được để trống hoặc quá ngắn.' });
  // }
  // if (!state.objective || state.objective.length < 10) {
  //   errors.value.push({ name: 'objective', message: 'Mục tiêu không được để trống hoặc quá ngắn.' });
  // }
  // if (!state.approach || state.approach.length < 10) {
  //   errors.value.push({ name: 'approach', message: 'Cách tiếp cận không được để trống hoặc quá ngắn.' });
  // }

  // if (!state.impact || state.impact.length < 10) {
  //   errors.value.push({ name: 'impact', message: 'Tác động không được để trống hoặc quá ngắn.' });
  // }
  // if (!state.results || state.results.length < 10) {
  //   errors.value.push({ name: 'results', message: 'Kết quả không được để trống hoặc quá ngắn.' });
  // }

  return errors.value;
};
const onSubmit = async () => {
  clearError();
  isLoading.value = true;
  const payload = {
    name: formData.value.base.name,
    slug: formData.value.base.slug,
    meta_title: formData.value.base.meta_title,
    meta_image: formData.value.base.meta_image,
    meta_desc: formData.value.base.meta_desc,
    image: formData.value.image,
    banner_image: formData.value.banner_image,
    logo: formData.value.logo,
    before_image: formData.value.before_image,
    after_image: formData.value.after_image,
    domain: formData.value.domain,

    is_show: formData.value.is_show,
    is_highlight: formData.value.is_highlight,
    desc: formData.value.desc,
    content: formData.value.content,
    objective: formData.value.objective,
    approach: formData.value.approach,
    impact: formData.value.impact,
    results: formData.value.results,
    galery: formData.value.galery,
    tag_ids: formData.value.tagIds
  }


  await useHttp('/vnwa/project/update/' + route.params.id, {
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

<style></style>