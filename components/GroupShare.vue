<template>
 <div>
  <div class="flex items-center justify-end">
   <div>
    <div class="text-base text-gray-600/80">Chia sẻ : </div>
   </div>
   <div class="ms-2">
    <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + link" target=" _blank" rel="noopener noreferrer">
     <UTooltip text="Chia sẻ lên Facebook" :popper="{ placement: 'top' }">
      <UButton color="gray">
       <Icon name="fa6-brands:facebook" color="white" />
      </UButton>
     </UTooltip>
    </a>
   </div>

   <div class="ms-2">
    <a :href="'http://twitter.com/share?text=Chia Sẻ Bài Từ Vinawebapp.com lên X &url=' + link" target=" _blank" rel="noopener noreferrer">
     <UTooltip text="Chia sẻ lên X (Twitter)" :popper="{ placement: 'top' }">
      <UButton color="gray">
       <Icon name="fa6-brands:x-twitter" color="white" />
      </UButton>
     </UTooltip>
    </a>
   </div>
   <div class="ms-2">
    <a :href="'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Chia Sẻ Bài Viết Từ Vinawebapp.com&body=' + link + '&ui=2&tf=1&pli=1'" target=" _blank" rel="noopener noreferrer">
     <UTooltip text="Chia sẻ qua Gmail" :popper="{ placement: 'top' }">
      <UButton color="gray">
       <Icon name="fa6-solid:envelope-circle-check" color="white" />
      </UButton>
     </UTooltip>
    </a>
   </div>

   <div class="ms-2">
    <div @click="coppyLink">
     <UTooltip text="Coppy Link" :popper="{ placement: 'top' }">
      <UButton color="gray">
       <Icon name="fa6-solid:link" color="white" />
      </UButton>
     </UTooltip>
    </div>
   </div>


  </div>
 </div>
</template>
<script setup>
const toast = useToast()

const link = window.location.href;
console.log(link);
function coppyLink() {
 navigator.clipboard.writeText(link);

 toast.add({ title: 'Sao chép liên kết thành công!' })
}
</script>
<style lang="">
 
</style>