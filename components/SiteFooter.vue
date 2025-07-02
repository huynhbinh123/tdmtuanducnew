<template>
  <!-- he thong nuoc duoi footer -->
  <div class="bg-white w-full">
    <UContainer>
      <div class="bg-white">
        <div class="flex text-center justify-center">
          <h3 class="text-orange-500 text-3xl font-bold uppercase py-10">
            {{ $t("menu.showroomSystem") }}
          </h3>
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 mb-20">
          <div
            v-for="(d, index) in showromms"
            :key="index"
            class="bg-gray-100 p-4 rounded-xl gap-10"
          >
            <div class="flex">
              <NuxtImg :src="d.NuxtImg" alt="" class="w-14" />
              <h3 class="text-orange-500 uppercase text-lg px-2">
                {{ d.name }}
              </h3>
              <button
                class="h-[26px] w-[82px] bg-orange-400 text-white p-2 flex text-center items-center justify-center rounded-sm"
              >
                <UIcon name="material-symbols:location-on-rounded" />
                <a :href="d.mapLink" class="text-xs">{{ $t("contact.map") }}</a>
              </button>
            </div>
            <div>
              <ul class="gap-6 flex py-2">
                <li class="text-white text-sm">
                  <div class="flex flex-col">
                    <h3 class="text-gray-900">
                      <span class="text-black/90 font-bold"
                        >{{ $t("contact.address") }}: </span
                      >{{ d.address }}
                    </h3>

                    <h3 class="text-gray-900">
                      <span class="text-black/90 font-bold"
                        >{{ $t("contact.phone") }}: </span
                      >{{ d.phone }}
                    </h3>

                    <h3 class="text-gray-900">
                      <span class="text-black/90 font-bold"
                        >{{ $t("contact.openingHours") }}:</span
                      >{{ d.openTime }}
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
  <!-- footer -->
  <footer class="bg-[#383838] w-full text-[#bcbcbc] gap-4">
    <UContainer>
      <div class="m-auto grid lg:grid-cols-4 grid-cols-1 py-10">
        <div v-for="(item, index) in footerItems" :key="index">
          <div class="lg:block hidden">
            <h4 class="font-semibold text-lg mb-3 text-orange-500">
              {{ item.name }}
            </h4>
            <div>
              <ul v-if="item.child">
                <li
                  v-for="(child2, childIndex) in item.child"
                  :key="childIndex"
                  class="mb-2"
                >
                  <NuxtLinkLocale
                    :to="`/blog/category/${child2.slug}`"
                    class="hover:underline"
                    >{{ child2.name }}</NuxtLinkLocale
                  >
                </li>
              </ul>
            </div>
          </div>
          <UCollapsible class="lg:hidden block">
            <div
              class="flex items-center justify-between gap-2 px-4 bg-orange-500 m-2 pt-2 rounded-md"
            >
              <h4 class="font-semibold text-lg mb-3 text-white">
                {{ item.name }}
              </h4>
              <UIcon
                name="material-symbols:keyboard-arrow-down"
                class="size-8 mb-2"
              />
            </div>

            <template #content>
              <ul v-if="item.child">
                <li
                  v-for="(child2, childIndex) in item.child"
                  :key="childIndex"
                  class="mb-2 ml-6"
                >
                  <a href="" class="hover:underline cursor-pointer">{{
                    child2.name
                  }}</a>
                </li>
              </ul></template
            >
          </UCollapsible>
        </div>
      </div>
    </UContainer>

    <div class="w-full bg-[#191919]">
      <UContainer>
        <div class="m-auto grid py-10 text-[#bcbcbc] lg:grid-cols-12">
          <div class="col-span-3 lg:mx-0 mx-4">
            <h2 class="font-black text-xl">{{ footerBottom.faq.name }}</h2>
            <div class="flex gap-4 py-4" v-if="footerBottom.faq.icons">
              <a
                v-for="(icon, iconIndex) in footerBottom.faq.icons"
                :key="iconIndex"
                href="/"
                class="border px-2 pt-1 text-white justify-center items-center"
              >
                <UIcon :name="icon.name" />
              </a>
            </div>
          </div>
          <div class="col-span-9 text-sm lg:mx-0 mx-4">
            <div>
              <p class="pb-4">{{ footerBottom.content.tittle }}</p>
              <p>
                {{ footerBottom.content.desc
                }}<a
                  v-if="footerBottom.content.showDMCA"
                  href="https://www.dmca.com/Protection/Status.aspx?ID=27c7bd2a-af6a-40b8-87f5-498526e3ff8f&refurl=https://www.tdm.vn/tim-kiem"
                  class="inline-block align-middle ml-1"
                >
                  <NuxtImg
                    src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-08.png?ID=27c7bd2a-af6a-40b8-87f5-498526e3ff8f"
                    alt="DMCA.com Protection Status"
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
const { t } = useI18n();
const footerItems = computed(() => {
  return [
    {
      name: t("menu.info"),
      child: [
        { name: t("menu.about"), slug: "gioi-thieu" },
        { name: t("menu.recruitment"), slug: "tuyen-dung" },
        { name: t("menu.distributionCompany"), slug: "hang-phan-phoi" },
        { name: t("menu.contact"), slug: "lien-he" },
      ],
    },
    {
      name: t("menu.policy"),
      child: [
        { name: t("menu.privacyPolicy"), slug: "chinh-sach-bao-mat" },
        { name: t("menu.returnPolicy"), slug: "chinh-sach-doi-tra" },
        { name: t("menu.shippingPolicy"), slug: "chinh-sach-van-chuyen" },
        { name: t("menu.customerSupport"), slug: "ho-tro-khach-hang" },
      ],
    },
    {
      name: t("menu.customerSupport"),
      child: [
        { name: t("menu.buyingGuide"), slug: "huong-dan-mua-hang" },
        { name: t("menu.paymentGuide"), slug: "huong-dan-thanh-toan" },
        { name: t("menu.faq"), slug: "cau-hoi-thuong-gap" },
        { name: t("menu.supportContact"), slug: "lien-he-ho-tro" },
      ],
    },
    {
      name: t("menu.news"),
      child: [
        { name: t("menu.promotion"), slug: "khuyen-mai" },
        { name: t("menu.catalog"), slug: "catalog" },
        { name: t("menu.bathroomAdvice"), slug: "thiet-bi-ve-sinh" },
        { name: t("menu.kitchenAdvice"), slug: "thiet-bi-bep" },
      ],
    },
  ];
});

const footerBottom = {
  faq: {
    name: t("connectWithUs"),
    icons: [
      { name: "fa6-brands:facebook-f", link: "#" },
      { name: "fa6-brands:square-youtube", link: "#" },
      { name: "fa6-brands:tiktok", link: "#" },
      { name: "fa6-brands:twitter", link: "#" },
      { name: "fa6-brands:pinterest-p", link: "#" },
    ],
  },
  content: {
    tittle:
      "DOANH NGHIỆP TƯ NHÂN THƯƠNG MẠI DỊCH VỤ TUẤN ĐỨC GPĐKKD số: 3700342131 Sở KHĐT Tỉnh Bình Dương cấp ngày 17/01/2017 Người đại diện: Trần Tuấn Đức",
    desc: "TDM @2015 - 2025 – TDM Tuấn Đức siêu thị thiết bị vệ sinh, thiết bị bếp, thiết bị nước, thiết bị điện hàng đầu tại Việt Nam. Mang lại sự tiện lợi, sự lựa chọn, giá cả rõ ràng hơn và dịch vụ giao hàng tại nhà. Với 3 showroom tại TPHCM, Hà Nội, Bình Dương ngoài ra hỗ trợ giao hàng đến Bà Rịa Vũng Tàu, Bình Phước, Đồng Nai, Tây Ninh, An Giang, Bạc Liêu, Bến Tre, Cà Mau, Cần Thơ, Đồng Tháp, Hậu Giang, Kiên Giang, Long An, Sóc Trăng, Tiền Giang, Bình Định, Bình Thuận, Đà Nẵng, Khánh Hòa, Ninh Thuận, Phú Yên, Quảng Nam, Quảng Ngãi , Trà Vinh, Vĩnh Long, Đắk Lắk, Đắk Nông, Gia Lai, Kon Tum, Lâm Đồng, Bắc Ninh, Hà Nam, Hải Dương, Hải Phòng, Hưng Yên, Nam Định, Ninh Bình, Thái Bình, Vĩnh Phúc, Điện Biên, Hòa Bình, Lai Châu, Lào Cai, Sơn La, Yên Bái, Bắc Giang, Bắc Kạn, Cao Bằng, Hà Giang, Lạng Sơn, Phú Thọ, Quảng Ninh, Thái Nguyên, Tuyên Quang, Hà Tĩnh, Nghệ An, Quảng Bình, Quảng Trị, Thanh Hóa, Thừa Thiên Huế.",
    showDMCA: true,
  },
};
const showromms = [
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
];
</script>

<style></style>
