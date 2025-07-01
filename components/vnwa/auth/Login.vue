<script lang="ts" setup>
import type { Form, ButtonProps } from "#ui/types";
import type { AuthProviders } from "~";

const config = useRuntimeConfig();
const router = useRouter();
const auth = useAuthStore();
const form = useTemplateRef<Form<any>>('form');
const toast = useToast();
const nuxtApp = useNuxtApp();

const state = reactive({
  email: "",
  password: "",
  remember: false,
});
const route = useRoute();
const { refresh: onSubmit, status: loginStatus } = useHttp<any>("admin-login", {
  method: "POST",
  body: state,
  immediate: false,
  watch: false,
  async onFetchResponse({ response }) {
    if (response?.status === 422) {
      form.value.setErrors(response._data?.errors);
    } else if (response._data?.ok) {
      nuxtApp.$token.value = response._data.token;

      await auth.fetchUser();
      let redirect = route.query.redirect 
      if (redirect) {
        return router.push(<string>redirect)
      } else {
        return router.push('/vnwa/dashboard') // hoặc trang admin dashboard
      }
    }
  }
});





</script>

<template>
  <div class="space-y-4">



    <UForm ref="form" :state="state" @submit="onSubmit" class="space-y-4">
      <UFormField label="Email" name="email" required>
        <UInput v-model="state.email" class="w-full" placeholder="you@example.com" icon="i-heroicons-envelope" trailing
          type="email" autofocus />
      </UFormField>

      <UFormField label="Password" name="password" required>
        <UInput v-model="state.password" type="password" class="w-full" placeholder="••••••••" />
      </UFormField>

      <UTooltip :delay-duration="0" text="for 1 month" :content="{ side: 'right', align: 'center' }">
        <div class="inline-flex">
          <UCheckbox v-model="state.remember" label="Remember me" class="inline-flex" />
        </div>
      </UTooltip>

      <div class="flex items-center justify-end space-x-4">
        <UButton  aria-label="Vinawebapp Button"  color="success" variant="outline" type="submit" label="Login" :loading="loginStatus === 'pending'" />
      </div>
    </UForm>


  </div>
</template>
