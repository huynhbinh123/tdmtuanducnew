export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (to.path === '/login') return;
  if (!auth.logged ) {
    const toast = useToast();

    if (process.client) {
      toast.add({
        icon: "i-heroicons-exclamation-circle-solid",
        title: "Access denied.",
        color: "error",
      });
    }
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
