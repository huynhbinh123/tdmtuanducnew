export default defineNuxtRouteMiddleware((to, from) => {
  const auth =  useAuthStore()
  const localePath = useLocalePath()

  if (to.fullPath != localePath('/vnwa/login')) {


    if (!auth.logged || !auth.hasRole('admin')) {
      const toast = useToast()

      toast.add({
        icon: "i-heroicons-exclamation-circle-solid",
        title: "Access denied.",
        color: "error",
      });

      return navigateTo(localePath('/vnwa/login'));

    }


  }



})
