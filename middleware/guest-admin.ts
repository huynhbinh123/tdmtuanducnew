export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const localePath = useLocalePath();

  if (auth.logged && auth.hasRole('admin')) {

    return navigateTo(localePath('/vnwa/'));
  }
})
