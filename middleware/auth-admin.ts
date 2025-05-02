export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (to.path === '/vnwa/login') return;
  if (!auth.logged) {
    const toast = useToast();

    if (process.client) {
      toast.add({
        icon: "i-heroicons-exclamation-circle-solid",
        title: "Access denied.",
        color: "error",
      });
    }
    return navigateTo(`/vnwa/login`);
    // return navigateTo(`/vnwa/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
