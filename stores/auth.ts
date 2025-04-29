import { defineStore } from 'pinia'

export type User = {
  ulid: string;
  name: string;
  email: string;
  avatar: string;
  must_verify_email: boolean;
  has_password: boolean;
  roles: string[];
  providers: string[];
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(<User>{});

  // Dùng cookie để lưu token, có thể truy cập ở SSR + giữ được sau reload
  const token = useCookie<string | null>('token', {
    default: () => null,
    watch: true
  });

  const logged = computed(() => !!token.value);

  const { refresh: logout } = useApi<any>('logout', {
    method: 'POST',
    immediate: false,
    onFetchResponse: ({ response }) => {
      if (response.status === 200) {
        reset();
        navigateTo('/login');
      }
    }
  });

  const { refresh: fetchUser } = useApi<any>('user', {
    immediate: false,
    onFetchResponse({ response }) {
      if (response.status === 200) {
        user.value = response._data.user;
      }
    }
  });

  function reset(): void {
    token.value = null;
    user.value = <User>{};
  }

  function hasRole(name: string): boolean {
    return user.value.roles?.includes(name);
  }

  return { user, token, logged, logout, fetchUser, reset, hasRole }
});
