<template>
  <transition name="diagonala" appear>
    <div class="px-6 mb-8 md:mb-0 md:pl-12 md:pr-3 col-span-2">
      <div
          class="box-shadow bg-orangeWhite p-6 rounded-lg relative box-shadow-hover hover:-translate-y-0.5 transition-all duration-300">
        <div class="flex gap-4 mb-6">
          <h3 class="font-semibold text-2xl">Tips of the day</h3>
          <!--        <img src="@/assets/img/light-bulb.png" alt="" class="w-8 h-8">-->
        </div>

        <div class="transparent-div flex gap-4 scroll-container overflow-x-scroll">
          <div class="flex-none w-80">
            <img class="mb-2 bg-contrastOrange/10 p-1.5 rounded-full" src="@/assets/img/icons/type.svg" alt="">
            <p class="font-semibold mb-1">Use Short and Descriptive Titles</p>
            <p class="text-black/70 text-[16px]">Opt for concise and descriptive titles for your notes. This practice
              will
              help you
              quickly identify the
              content of each note.</p>
          </div>
          <div class="flex-none w-80">
            <img class="mb-2 bg-red-100/80 p-1.5 rounded-full" src="@/assets/img/icons/bookmark.svg" alt="">
            <p class="font-semibold mb-1">Create Categories or Tags </p>
            <p class="text-black/70">Use categories or tags to organize your notes effectively. This way, you can
              quickly
              find and group related notes together.</p>
          </div>
          <div class="flex-none w-80">
            <img class="mb-2 bg-orange/20 p-1.5 rounded-full" src="@/assets/img/icons/calendar.svg" alt="">
            <p class="font-semibold mb-1">Set Reminders or Due Dates </p>
            <p class="text-black/70">Set reminders or due dates for important notes to keep track of tasks and
              deadlines. Be efficient!</p>
          </div>
          <div class="flex-none w-80">
            <img class="mb-2 bg-darkOrange/20 p-1.5 rounded-full" src="@/assets/img/icons/check-square-brown.svg"
                 alt="">
            <p class="font-semibold mb-1">Review and Organize Regularly</p>
            <p class="text-black/70">Regularly review your notes and archive or delete outdated ones, to maintain a
              clean
              and efficient note-taking system.</p>
          </div>
        </div>
        <div class="gradient-overlay"></div>
      </div>
    </div>
  </transition>
</template>


<style>
.slide-enter-active {
  animation: slide 0.5s ease-out;
}

.slide-leave-active {
  animation: slide 0.5s ease-in reverse;
}

.diagonala-enter-active {
  animation: diagonala 0.7s ease-out;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes diagonala {
  from {
    opacity: 90%;
    transform: translateX(-2%) translateY(-2%);
  }

  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

.gradient-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 40px;
  width: 60px; /* Adjust the width of the transparent gradient as per your preference */
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.box-shadow {
  -webkit-box-shadow: 1px 2px 19px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 2px 19px 2px rgba(0, 0, 0, 0.2);
}

.box-shadow-hover:hover {
  -webkit-box-shadow: 1px 2px 19px 2.5px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 19px 2.5px rgba(0, 0, 0, 0.25);
}

.box-shadow-sm {
  -webkit-box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.18);
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.18);
}

</style>
<script setup>
</script>