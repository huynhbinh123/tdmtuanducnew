<script setup>
const props = defineProps({
  ErrorMess: {
    type:String,
    default:'Page Not Found'
  },
  ErrorType: {
    type:String,
    default:'404'
  },
});
</script>
<template lang="">
  <div>
    <div class="page-error">
      <div class="noise"></div>
      <div class="overlay"></div>
      <div class="terminal">
        <div>
          <h1> <span class="errorcode">{{ ErrorType }}</span></h1>
          <p class="output">{{ ErrorMess }} </p>
          <p class="output">Click Here <a  href="/">Back To Home</a></p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import 'https://fonts.googleapis.com/css?family=Inconsolata';

.page-error {
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  background-color: #000000;
  background-image: radial-gradient(#11581E, #041607), url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  font-size: 1.5rem;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
    0 0 1ex rgba(51, 255, 51, 1),
    0 0 2px rgba(255, 255, 255, 0.8);
}




.page-error .noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
}

.page-error .overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    repeating-linear-gradient(180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;
}

.page-error .overlay::before {
  content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg,
      transparent 0%,
      rgba(32, 128, 32, 0.2) 2%,
      rgba(32, 128, 32, 0.8) 3%,
      rgba(32, 128, 32, 0.2) 3%,
      transparent 100%);
  background-repeat: no-repeat;
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0% {
    background-position: 0 -100vh;
  }

  35%,
  100% {
    background-position: 0 100vh;
  }
}

.page-error .terminal {
  box-sizing: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 4rem;
  text-transform: uppercase;
}

.page-error .output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
    0 0 1px rgba(51, 255, 51, 0.4),
    0 0 2px rgba(255, 255, 255, 0.8);
  width: 100%;
  display: block;
}

.page-error .output::before {
  content: "> ";
}

/*
.input {
  color: rgba(192, 255, 192, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.input::before {
  content: "$ ";
}
*/

a {
  color: #fff;
  text-decoration: none;
}

.page-error a::before {
  content: "[";
}

.page-error a::after {
  content: "]";
}

.page-error .errorcode {
  color: white;
}
</style>
