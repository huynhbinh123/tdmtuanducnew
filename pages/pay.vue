<template>
  <UContainer class="mt-6">
    <!-- Breadcrumb -->
   <Breadcrumb :items="[{ name: $t('cart.placeOrder') }]" />

    <form @submit.prevent="handleSubmit" class="lg:flex gap-10 mt-6">
      <div class="lg:w-[30%] space-y-6">
        <div
          v-for="group in leftForm.filter(
            (g) => g.group !== 'xác nhận đơn hàng'
          )"
          :key="group.group"
        >
          <div
            class="flex justify-between border-l-3 border-blue-400 items-center bg-gray-100 p-2"
            :class="{
              'mt-3': group.group === 'Thông tin thanh toán',
              'mt-0': group.group !== 'Thông tin thanh toán',
            }"
          >
            <h3 class="text-black font-bold text-sm gap-2 uppercase">
              {{ group.group }}
            </h3>
            <UIcon :name="group.icon" class="text-black" size="20" />
          </div>

          <div v-if="group.buttons" class="mt-4 flex gap-2">
            <button
              type="button"
              @click="toggleLogin"
              :class="[
                'flex-1 p-1 cursor-pointer',
                isLogin
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-500',
              ]"
            >
              {{ group.buttons[0].login }}
            </button>
            <button
              type="button"
              @click="toggleGuest"
              :class="[
                'flex-1 p-1 cursor-pointer',
                !isLogin
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-500',
              ]"
            >
              {{ group.buttons[0].guest }}
            </button>
          </div>

          <template
            v-for="field in group.fields"
            :key="field.model ?? field.forgot"
          >
            <!-- Hiển thị các input như Email / Mật khẩu -->
            <Transition name="slide-down" mode="out-in">
              <div
                class="mt-3"
                v-if="field.model && (field.model !== 'password' || isLogin)"
              >
                <label :for="field.model" class="block text-black/80">
                  {{ field.label }}
                  <span v-if="field.required" class="text-red-500 ms-1">*</span>
                </label>
                <input
                  :type="field.type"
                  :id="field.model"
                  :name="field.model"
                  v-model="formData[field.model as FormField]"
                  :placeholder="field.placeholder"
                  :required="field.required"
                  class="w-full bg-gray-100 text-black/70 p-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
            </Transition>

            <!-- Chỉ hiển thị quên mật khẩu và nút đăng nhập khi isLogin = true -->
            <Transition name="slide-down" mode="out-in">
              <div class="mt-3 flex flex-col" v-if="field.forgot && isLogin">
                <NuxtLinkLocale to="/forgot" class="flex justify-end -mt-2">
                  <span class="text-orange-600">{{ field.forgot }}</span>
                </NuxtLinkLocale>

                <UButton
                  @click="handleLogin"
                  class="bg-orange-500 text-white cursor-pointer hover:bg-orange-400 w-full p-3 flex justify-center uppercase mt-2"
                >
                  {{ $t("auth.login") }}
                </UButton>
              </div>
            </Transition>
          </template>
        </div>
      </div>

      <div class="lg:w-[70%] space-y-6">
        <!-- 1. Xác nhận đơn hàng -->
        <div v-if="(orderSummaryGroup?.products?.length ?? 0) > 0" class="mt-4">
          <div
            class="flex justify-between border-l-3 border-blue-400 items-center bg-gray-100 p-2"
          >
            <h3 class="text-black font-bold text-sm gap-2 uppercase">
              {{ orderSummaryGroup?.group }}
            </h3>
            <UIcon
              :name="orderSummaryGroup?.icon || ''"
              class="text-black"
              size="20"
            />
          </div>

          <div
            class="mt-4 space-y-2 lg:flex items-center justify-between gap-4 bg-gray-100 p-2"
            v-for="(product, index) in orderSummaryGroup?.products"
            :key="index"
          >
            <div class="">
              <p class="text-black">{{ product.title }}</p>
              <p class="text-gray-500">{{ product.desc }}</p>
            </div>
            <div class="flex items-center mt-2 gap-4">
              <div class="flex items-center gap-1">
                <UButton
                  size="sm"
                  icon="i-heroicons-minus"
                  class="text-black cursor-pointer"
                  @click="decreaseQuantity(product)"
                />
                <span class="text-black">{{ product.quantity }}</span>
                <UButton
                  size="sm"
                  icon="i-heroicons-plus"
                  class="text-black cursor-pointer"
                  @click="increaseQuantity(product)"
                />
              </div>
              <span class="text-black"
                >{{ product.price.toLocaleString() }}đ</span
              >
              <span class="text-black font-semibold whitespace-nowrap">
                {{ $t("cart.total") }}: {{ product.totalPrice.toLocaleString() }}đ
              </span>
              <span>
                <UIcon
                  name="material-symbols:close-rounded"
                  @click="removeProduct(index)"
                  class="text-black text-2xl cursor-pointer hover:text-black/50"
                />
              </span>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <span class="flex gap-2 items-center text-lg font-semibold">
              <span class="text-black">{{ $t("cart.totalPrice") }}:</span>
              <span class="text-orange-600"
                >{{ totalOrderAmount.toLocaleString() }}đ</span
              >
            </span>
          </div>
        </div>
        <div v-else class="flex flex-col justify-center mt-4 text-center">
          <h2 class="text-black/80 py-4">{{ $t("cart.emty") }}</h2>
          <NuxtLinkLocale to="/">
            <UButton
              class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow font-semibold cursor-pointer w-[120px] text-center"
            >
              <span class="mx-auto">{{ $t("cart.continue") }}</span>
            </UButton>
          </NuxtLinkLocale>
        </div>

        <!-- 2. Ghi chú thêm cho đơn hàng -->
        <div class="mt-6 border-t border-dashed border-gray-400">
          <p class="text-black font-bold mt-4">{{ $t("cart.note") }}</p>
          <UTextarea
            class="w-full"
            :placeholder="$t('cart.note')"
            v-model="orderNote"
            :ui="{ base: 'bg-gray-100 text-black' }"
          />
        </div>

        <!-- 3. Hướng dẫn chuyển khoản -->

        <div v-if="bankInfoGroup" class="mt-4">
          <div
            class="flex justify-between border-l-3 border-blue-400 items-center bg-gray-100 p-2"
          >
            <h3 class="text-black font-bold text-sm gap-2 uppercase">
              {{ bankInfoGroup.group }}
            </h3>
          </div>
          <p class="text-sm text-black leading-relaxed mt-2">
            Ngân hàng Ngoại thương Vietcombank<br />
            Tên tài khoản: Doanh nghiệp tư nhân thương mại dịch vụ Tuấn Đức<br />
            Số tài khoản: 0461003764572<br />
            Chi nhánh Tân Bình Dương
          </p>
        </div>

        <!-- 4. Đặt hàng -->
        <div class="flex items-center justify-between my-4">
          <UCheckbox
            v-model="isAgreed"
            :label="$t('cart.agreeWithFAQ')"
            :ui="{ label: 'text-black cursor-pointer' }"
          />

          <UButton
            type="submit"
            class="bg-orange-500 text-white cursor-pointer hover:bg-orange-400 w-[200px] p-3 flex justify-center uppercase"
            >{{ $t("cart.placeOrder") }}</UButton
          </UButton>
        </div>
      </div>
    </form>
  </UContainer>
</template>

<script setup lang="ts">
const isLogin = ref(false);
const orderNote = ref("");
const isAgreed = ref(false);
const toast = useToast();

const toggleLogin = () => {
  isLogin.value = true;
};
const toggleGuest = () => {
  isLogin.value = false;
};

type LeftFormField = {
  label?: string;
  model?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  forgot?: string;
};

type LeftFormGroup = {
  group: string;
  icon: string;
  buttons?: { login: string; guest: string }[];
  fields?: LeftFormField[];
};

const { t } = useI18n()

const leftForm: LeftFormGroup[] = [
  {
    group: t('form.login'),
    icon: 'material-symbols:person-rounded',
    buttons: [
      { login: t('form.login'), guest: t('form.guest') }
    ],
    fields: [
      {
        label: t('form.email'),
        model: 'email',
        placeholder: t('form.enterEmail'),
        type: 'email',
        required: true
      },
      {
        label: t('form.password'),
        model: 'password',
        placeholder: t('form.enterPassword'),
        type: 'password',
        required: true
      },
      {
        forgot: t('form.forgotPassword')
      }
    ]
  },
  {
    group: t('form.billingInfo'),
    icon: 'solar:letter-bold',
    fields: [
      {
        label: t('form.firstName'),
        model: 'firstName',
        placeholder: t('form.enterFirstName'),
        type: 'text',
        required: true
      },
      {
        label: t('form.phone'),
        model: 'phone',
        placeholder: t('form.enterPhone'),
        type: 'tel',
        required: true
      },
      {
        label: t('form.address'),
        model: 'address',
        placeholder: t('form.enterAddress'),
        type: 'text',
        required: true
      }
    ]
  },
  {
    group: t('form.confirmOrder'),
    icon: 'material-symbols:shopping-cart'
  }
]

const rightForm = ref([
  {
    group: t('form.confirmOrder'),
    icon: 'material-symbols:shopping-cart',
    type: 'orderSummary',
    products: reactive([
      {
        title: 'Chậu Rửa Lavabo Inax AL-2298V (AL2298V) Âm Bàn AquaCeramic',
        desc: ' - Mã sản phẩm: AL-2298V',
        quantity: 2,
        price: 2040000,
        get totalPrice() {
          return this.quantity * this.price
        }
      },
      {
        title: 'Chậu Rửa Lavabo Inax AL-2298V (AL2298V) Âm Bàn AquaCeramic',
        desc: ' - Mã sản phẩm: AL-2298V',
        quantity: 1,
        price: 2040000,
        get totalPrice() {
          return this.quantity * this.price
        }
      }
    ])
  },
  {
    group: t('form.bankTransferGuide'),
    type: 'bankInfo'
  }
])

const orderSummaryGroup = computed(
  () =>
    rightForm.value.find((group) => group.type === "orderSummary") as
      | {
          products?: {
            quantity: number;
            price: number;
            totalPrice: number;
            title: string;
            desc: string;
          }[];
          group: string;
          icon: string;
        }
      | undefined
);

const increaseQuantity = (product: any) => {
  product.quantity++;
};

const decreaseQuantity = (product: any) => {
  if (product.quantity > 1) product.quantity--;
};

const bankInfoGroup = rightForm.value.find(
  (group) => group.type === "bankInfo"
);

type FormField = "firstName" | "email" | "phone" | "password";

const formData = reactive<Record<FormField, string>>({
  firstName: "",
  email: "",
  phone: "",
  password: "",
});
const handleSubmit = () => {
  if (!isAgreed.value) {
    toast.add({
      title: "Vui lòng đồng ý với điều khoản",
      description:
        'Bạn cần tick vào "Tôi đã đọc và đồng ý với Các câu hỏi thường gặp" để tiếp tục.',
      color: "error",
      icon: "i-heroicons-exclamation-triangle",
    });
    return;
  }
  const orderData = {
    ...formData,
    note: orderNote.value,
    products: orderSummaryGroup.value?.products || [],
    totalAmount: totalOrderAmount.value,
  };

  console.log("Dữ liệu đặt hàng:", orderData);
};

const handleLogin = () => {
  const loginData = {
    email: formData.email,
    password: formData.password,
  };
  console.log("Dữ liệu đăng nhập:", loginData);
};

const totalOrderAmount = computed(() => {
  const group = orderSummaryGroup.value;
  if (!group || !group.products) return 0;
  return group.products.reduce((sum, p) => sum + p.totalPrice, 0);
});
const removeProduct = (index: number) => {
  if (orderSummaryGroup.value?.products) {
    orderSummaryGroup.value.products.splice(index, 1);
  }
};

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
