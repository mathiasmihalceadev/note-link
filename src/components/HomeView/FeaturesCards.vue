<template>
  <section class="lg:px-48 mt-24 max-w-[1360px] mx-auto relative">
    <div class="px-6 flex gap-4 overflow-x-scroll scroll-container">
      <div @click="setIsActive('ui')" :class="{orange: isActive['ui']}"
           class="flex-none flex lg:flex-col lg:px-4 lg:pb-3 lg:pt-4 lg:gap-6 lg:border-transparent items-center gap-2 px-4 py-2 border-solid border-orangeBlack/20 border-2 rounded-lg cursor-pointer orange-hover">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="#44413C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="feather feather-sidebar">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
        <p class="text-base font-semibold text-orangeBlack/70">Clean modern UI</p>
      </div>
      <div @click="setIsActive('features')" :class="{orange: isActive['features']}"
           class="flex-none flex lg:flex-col lg:px-4 lg:pb-3 lg:pt-4 lg:gap-6 lg:border-transparent items-center gap-2 px-4 py-2 border-solid border-orangeBlack/20 border-2 rounded-lg cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="feather feather-edit-2">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
        <p class="text-base font-semibold text-orangeBlack/70">Basic features
        </p>
      </div>
      <div @click="setIsActive('mobile')" :class="{orange: isActive['mobile']}"
           class="flex-none flex lg:flex-col lg:px-4 lg:pb-3 lg:pt-4 lg:gap-6 lg:border-transparent items-center gap-2 px-4 py-2 border-solid border-orangeBlack/20 border-2 rounded-lg cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="feather feather-smartphone">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
        <p class="text-base font-semibold text-orangeBlack/70">Mobile responsive
        </p>
      </div>
    </div>
    <div class="px-6 ">
      <img v-if="isActive['ui']" src="@/assets/img/app-showcase.png" alt=""
           class="rounded-md box-shadow mt-8 animate__animated animate__fadeIn">
      <img v-else-if="isActive['features']" src="@/assets/img/basic-features.png" alt=""
           class="rounded-md box-shadow mt-8 animate__animated animate__fadeIn">
      <img v-else-if="isActive['mobile']" src="@/assets/img/mobile-responsive.png" alt=""
           class="rounded-md box-shadow mt-8 h-24 mx-auto animate__animated animate__fadeIn">
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isActive: {'ui': true},
    }
  },
  methods: {
    setIsActive(data) {
      this.isActive = {}
      this.isActive[data] = true
    }
  }
}
</script>

<style scoped>
.orange-hover:hover {
  border: solid 2px #EA9D0E;
  stroke: #EA9D0E;
  color: #EA9D0E;
}

.orange {
  border: solid 2px #EA9D0E;
}

.orange p {
  color: #EA9D0E;
}

.orange svg {
  stroke: #EA9D0E;
}

.bg-notebook {
  background-image: url("@/assets/img/notebook-bg.png");
  height: 50px;
}

.bg-paper {
  background-image: url("@/assets/img/paper-ripped-bg.png");
  height: 50px;
}
</style>