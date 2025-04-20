<template>
  <div>
    <div class="bg-midnight-blue-700 ">

      <div class="">
        <div class="grid grid-cols-12 gap-4">
          <div class="lg:col-span-7 col-span-12 lg:order-1 order-2  ">
            <div class="flex flex-col items-center justify-between w-full h-full lg:p-10 p-5">

              <div class="text-start lg:mb-10 mb-5 w-full">
                <h2 class="uppercase text-white  lg:text-3xl text-2xl font-medium">
                  Contact
                </h2>
              </div>
              <div class="w-full">
                <div class="lg:space-y-5 space-y-4 lg:mb-10 mb-5 text-white/80 lg:text-2xl text-lg">

                  <div class="whitespace-pre-line">

                    Book a session, schedule a meeting or ask us any question you have in mind!
                    <br />
                    Just leave us a message and we'll get back to you as soon as possible!
                  </div>

                </div>
                <ContactForm />
              </div>
              <div>

              </div>
            </div>

          </div>
          <div class="lg:col-span-5 col-span-12 lg:order-2 order-1 ">
            <div class="w-full h-full flex items-center justify-center">

              <NuxtImg loading="lazy" decoding="auto" width="800" class="w-full" src="/images/contact_image.avif" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Contact'
})
</script>

<style></style>