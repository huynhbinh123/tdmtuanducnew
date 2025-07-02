<template>
  <UContainer>
    <div><Breadcrumb :items="[{ name: $t('auth.breadcrumb') }]" /></div>

    <div class="grid lg:grid-cols-2 gap-6 mt-4 items-start">
      <!-- Khách hàng mới -->
      <div class="flex flex-col bg-gray-100 rounded-lg text-black gap-2 p-6">
        <h2 class="text-3xl">{{ $t("auth.newCustomer") }}</h2>
        <h3>{{ $t("auth.registerTitle") }}</h3>
        <p class="text-black/70">{{ $t("auth.registerDesc") }}</p>
        <NuxtLink to="/dang-ky">
          <UButton
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow font-semibold cursor-pointer w-[100px] flex items-center justify-center"
          >
            {{ $t("auth.continue") }}
          </UButton>
        </NuxtLink>
      </div>

      <!-- Khách hàng cũ -->
      <div class="flex flex-col bg-gray-100 rounded-lg text-black gap-4 p-6">
        <h2 class="text-3xl">{{ $t("auth.existingCustomer") }}</h2>
        <h3>{{ $t("auth.alreadyHaveAccount") }}</h3>

        <UForm
          ref="formRef"
          :state="form"
          :schema="schema"
          @submit="handleSubmit"
        >
          <!-- Email -->
          <UFormGroup :label="$t('auth.emailLabel')" name="email">
            <UInput
              type="email"
              autocomplete="email"
              v-model="form.email"
              :placeholder="$t('auth.emailPlaceholder')"
              size="xl"
              trailing-icon="i-lucide-at-sign"
              class="w-full"
              :ui="{ base: 'bg-white text-black' }"
            />
          </UFormGroup>

          <!-- Password -->
          <UFormGroup
            :label="$t('auth.passwordLabel')"
            name="password"
            class="mt-4"
          >
            <UInput
              :type="show ? 'text' : 'password'"
              v-model="form.password"
              autocomplete="current-password"
              :placeholder="$t('auth.passwordPlaceholder')"
              size="xl"
              class="w-full mt-4"
              @keyup.enter="formRef?.submit()"
              :ui="{
                base: 'bg-white text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500',
                trailing: 'pe-1',
              }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  class="cursor-pointer"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="
                    show ? $t('auth.hidePassword') : $t('auth.showPassword')
                  "
                  @click.prevent="show = !show"
                />
              </template>
            </UInput>
          </UFormGroup>

          <NuxtLink to="/forgot"
            ><p class="text-orange-400 block mt-2 hover:text-orange-300">
              {{ $t("auth.forgotPassword") }}
            </p>
          </NuxtLink>

          <UButton
            type="submit"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow font-semibold mt-6 cursor-pointer whitespace-nowrap"
          >
            {{ $t("auth.login") }}
          </UButton>
        </UForm>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { z } from "zod";

const show = ref(false);
const formRef = ref();

const route = useRoute();

const form = reactive({
  email: "",
  password: "",
});

const schema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
});

const handleSubmit = async () => {
  console.log("Form hợp lệ:", form);
};

onMounted(() => {
  if (route.query.email && typeof route.query.email === "string") {
    form.email = route.query.email;
  }
});
</script>
