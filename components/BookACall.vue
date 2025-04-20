<script setup>
const calendly = useCalendly();
const handleClick = () => {
  calendly.initPopupWidget({
    url: 'https://calendly.com/nhatnguyen061003/vinawebapp-com',
  })
};
</script>
<template lang="">
 <div>
  <div id="btnContact" class="sm:bottom-14 bottom-10 rounded-full   right-5 shadow-lg shadow-sky-500/50 hover:shadow-sky-500/90  md:hover:skew-y-6"  @click="handleClick" >
 

<div class="box ">
  <div class=" ">

    <Icon name="material-symbols:open-in-phone" class="h-10 w-10"  />
  </div>

</div>
  </div>

 </div>
</template>

<style scoped>
.box {
  width: 70px;
  height: 70px;
  display: grid;
  place-content: center;
  color: white;
  text-shadow: 0 1px 0 #000;
  --border-angle: 0turn;
  --main-bg: conic-gradient(from var(--border-angle), #213, #112 5%, #112 60%, #213 95%);
  border: solid 5px transparent;
  border-radius: 2em;
  --gradient-border: conic-gradient(from var(--border-angle), transparent 25%, #08f, #f03 99%, transparent);
  background: var(--main-bg) padding-box, var(--gradient-border) border-box, var(--main-bg) border-box;
  background-position: center center;
  animation: bg-spin 3s linear infinite;
}

@keyframes bg-spin {
  to {
    --border-angle: 1turn;
  }
}

.box:hover {
  animation-play-state: paused;
}

@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}


#btnContact {
  z-index: 100;
  width: 70px;
  height: 70px;
  position: fixed;
  cursor: pointer;
  transition: all 0.5s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  /* overflow: hidden; */
}




/* 

@media (max-width: 640px) {
  #btnContact {
    background: #7e00ad;
    font-size: 16px;
    width: 70px;
    height: 70px;
  }

  #btnContact div {
    padding: 0;
    justify-content: center;
    background: #000;
    margin: 0;
  }

  #btnContact h3 {
    display: none;
  }
} */
</style>