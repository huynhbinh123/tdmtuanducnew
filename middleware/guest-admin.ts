export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if (auth.logged && auth.hasRole('admin')) {

    return navigateTo('/vnwa/dashboard');
  }
})
