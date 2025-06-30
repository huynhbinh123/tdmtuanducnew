<script setup lang="ts">
import type { MetaSeo } from '~/type';

interface AppearanceData {
  hero_section: {
    title: string;
    slogan: string;
  };
  process: {
    label: string;
    content: string;
    icon: string;
    primary_label: string;
    bg_color: string;
    text_color: string;
    desc: string;
  }[];
  meta: MetaSeo

}
const { locale } = useI18n();
const { data, status } = await useHttp<AppearanceData>('load-data-process-page', {
  method: 'GET',
  params: {
    locale: locale
  }
});
useSeoMeta({
  title: data.value.meta.title,
  description: data.value.meta.desc,
  ogTitle: data.value.meta.title,
  ogDescription: data.value.meta.desc,
  ogImage: useNuxtApp().$storage(data.value.meta.image),
  twitterTitle: data.value.meta.title,
  twitterDescription: data.value.meta.desc,
  twitterImage: useNuxtApp().$storage(data.value.meta.image),
});
// const process: Item[] = [
//   {
//     title: 'Tiếp Nhận & Tư Vấn Chiến Lược',
//     description: 'Lắng nghe nhu cầu và mục tiêu kinh doanh của bạn. Phân tích thị trường, khách hàng mục tiêu và đưa ra định hướng thiết kế phù hợp.',
//     icon: 'ph:handshake-light',
//     badge: 'Khởi đầu',
//     color: 'primary',
//     time: 'Hôm nay'
//   },
//   {
//     title: 'Lập Kế Hoạch & Báo Giá',
//     description: 'Xây dựng sitemap, lập timeline và gửi báo giá minh bạch. Ký hợp đồng rõ ràng để khởi động dự án.',
//     icon: 'carbon:task',
//     badge: 'Kế hoạch',
//     color: 'info',
//     time: 'Hôm nay'
//   },
//   {
//     title: 'Thiết Kế Giao Diện UI/UX',
//     description: 'Thiết kế trải nghiệm người dùng (UX) mượt mà cùng giao diện (UI) tinh tế, hiện đại và đậm dấu ấn thương hiệu.',
//     icon: 'material-symbols:design-services-outline',
//     badge: 'Thiết kế',
//     color: 'warning',
//     time: 'Ngày 2'
//   },
//   {
//     title: 'Lập Trình & Phát Triển Website',
//     description: 'Biến thiết kế thành sản phẩm thực tế với công nghệ hiện đại. Chuẩn SEO, tốc độ cao, hiển thị tốt trên mọi thiết bị.',
//     icon: 'mdi:code-tags',
//     badge: 'Phát triển',
//     color: 'success',
//     time: 'Ngày 3'
//   },
//   {
//     title: 'Kiểm Tra & Hiệu Chỉnh',
//     description: 'Test toàn diện website về tốc độ, bảo mật, tương thích trình duyệt và thiết bị. Chỉnh sửa theo phản hồi cuối.',
//     icon: 'fluent:accessibility-checkmark-20-regular',
//     badge: 'Kiểm thử',
//     color: 'error',
//     time: 'Ngày 4'
//   },
//   {
//     title: 'Bàn Giao & Hướng Dẫn Sử Dụng',
//     description: 'Bàn giao mã nguồn, tài khoản quản trị và hướng dẫn sử dụng hệ thống chi tiết.',
//     icon: 'mdi:clipboard-check-outline',
//     badge: 'Bàn giao',
//     color: 'secondary',
//     time: 'Ngày 5'
//   },
//   {
//     title: 'Bảo Trì & Hỗ Trợ Dài Hạn',
//     description: 'Hỗ trợ kỹ thuật miễn phí, bảo trì định kỳ và nâng cấp website theo nhu cầu phát triển doanh nghiệp.',
//     icon: 'mdi:lifebuoy',
//     badge: 'Hỗ trợ',
//     color: 'gray',
//     time: 'Liên tục'
//   }
// ];




</script>

<template>
  <div>

    <div>
      <img src="~/assets/images/process_bg.jpg" class="w-full h-auto opacity-25 fixed -top-20 " alt="Vinawebapp.com" />


      <div class="relative    py-10  " v-if="status === 'success'">
        <PageHeroSection :title="data.hero_section.title" :slogan="data.hero_section.slogan" />

        <UContainer>

          <div class="timeline">
            <div v-for="(item, index) in data.process" :key="index" :class="['timeline-container']" style="">
              <div class="timeline-icon" :style="{ backgroundColor: item.bg_color }">
                <UIcon :name="item.icon" class="text-xl " :style="{ color: item.text_color }" />
              </div>
              <div class=" section_why_me_item">
                <div>
                  <h4 class="timeline-title mb-3">

                    <span class="badge px-3 py-1 rounded-lg" :style="{
                      color: item.text_color,
                      backgroundColor: item.bg_color
                    }">{{ item.primary_label }}</span> - <strong>{{ item.label }}</strong>

                  </h4>
                  <p>{{ item.content }}</p>
                  <p class=" text-gray-500 text-xs mt-10">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

        </UContainer>

      </div>
      <div class="divider"></div>



    </div>



  </div>
</template>


<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Niramit:300,300i,700');

// colors
$primary: #1d8cf8;
$secondary: #4f537b;
$info: #11cdef;
$success: #00bf9a;
$warning: #ff8d72;
$danger: #fd5d93;

// timeline variables
$body-bg: #1e1e2f;
$timeline-before-bg : #222a42;
$timeline-body-bg: #27293d;
$timeline-body-round: 3px;
$timeline-body-shadow: 1px 3px 9px rgba(0, 0, 0, .1);






// timeline style
.timeline {
  position: relative;
  padding-left: 4rem;
  margin: 0 0 0 30px;
  color: white;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: $timeline-body-bg;
  }

  .timeline-container {
    position: relative;
    margin-bottom: 2.5rem;
    ;

    .timeline-icon {
      position: absolute;
      left: -88px;
      top: 4px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      font-size: 2rem;
      background: $secondary;

      i {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .timeline-body {
      background: $timeline-body-bg;
      border-radius: $timeline-body-round;
      padding: 20px 20px 15px;
      box-shadow: $timeline-body-shadow;

      &:before {
        content: '';
        background: inherit;
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        left: -10px;
        transform: rotate(45deg);
        border-radius: 0 0 0 2px;
      }

      .timeline-title {
        margin-bottom: 1.4rem;

        .badge {
          background: $secondary;
          padding: 4px 8px;
          border-radius: 3px;
          font-weight: bold;
        }
      }

      .timeline-subtitle {
        font-weight: 300;
        font-style: italic;
        opacity: .4;
        margin-top: 16px;
        font-size: 11px;
      }
    }

    // Primary Timeline
    &.primary {

      .badge,
      .timeline-icon {
        background: $primary !important;
      }
    }

    // Info Timeline
    &.info {

      .badge,
      .timeline-icon {
        background: $info !important;
      }
    }

    // Success Timeline
    &.success {

      .badge,
      .timeline-icon {
        background: $success !important;
      }
    }

    // Warning Timeline
    &.warning {

      .badge,
      .timeline-icon {
        background: $warning !important;
      }
    }

    // Dnager Timeline
    &.danger {

      .badge,
      .timeline-icon {
        background: $danger !important;
      }
    }

  }
}


.author {
  font-family: inherit;
  padding: 3em;
  text-align: center;
  width: 100%;
  color: white;

  a:link,
  a:visited {
    color: white;

    &:hover {
      text-decoration: none;
    }
  }

  .btn:link,
  .btn:visited {
    margin-top: 1em;
    text-decoration: none;
    display: inline-block;
    font-family: inherit;
    font-weight: 100;
    color: white;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: black;
    padding: 1.5em 2rem;
    border-radius: 1em;
    transition: .5s all;

    &:hover,
    &:focus,
    &:active {
      background-color: lighten(black, 10%);
    }
  }
}
</style>