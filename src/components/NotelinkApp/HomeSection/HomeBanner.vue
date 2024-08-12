<template>
  <div class="relative">
    <transition name="banner-fade" tag="div" mode="out-in">
      <div :key="activeBannerClass" :class="activeBannerClass"
           class="px-6 md:px-12 py-44">
      </div>
    </transition>

    <div class="px-6 md:px-12 pb-36 mt-[-348px]">

      <top-bar @open-sidebar="openSidebar"></top-bar>

      <div class="flex justify-between items-center pt-6 md:pt-12 pb-12 relative ">
        <transition name="diagonala" appear>
          <div class="hidden md:flex gap-2 md:gap-4">
            <img @click="previousBanner"
                 class="bg-orangeGray/80 hover:bg-orangeGray transition-all duration-300 rounded-full p-1 w-10 cursor-pointer "
                 src="@/assets/img/icons/chevron-left.svg" alt="">
            <img @click="nextBanner"
                 class="bg-orangeGray/80 hover:bg-orangeGray transition-all duration-300 rounded-full p-1 w-10 cursor-pointer"
                 src="@/assets/img/icons/chevron-right.svg" alt="">
          </div>
        </transition>
        <transition name="diagonala" appear>
          <div class="hidden md:block absolute bg-orangeBlack small-menu p-2 right-0 top-0 mt-12">
            <div class="items-center gap-2 hidden md:flex mb-1">
              <p class=" text-[14px] font-semibold text-orangeWhite tracking-wide hidden md:block">{{ userName }}
              </p>
              <img @click="isOpenMenu = !isOpenMenu" class="mr-1 cursor-pointer"
                   src="@/assets/img/icons/chevron-down.svg" alt="">
            </div>
            <div v-if="isOpenMenu">
              <ul class="cursor-pointer text-orangeWhite/80 text-[13px]">
                <li class="hover:text-orangeWhite transition-all duration-100">Edit banner</li>
                <li @click="removeAll" class="hover:text-orangeWhite transition-all duration-100">Change user</li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <transition name="diagonala" appear>

        <div>

          <h2 class="text-4xl font-bold text-orangeWhite">Hello, {{ userName }}.</h2>
          <p class="text-sm uppercase text-orangeWhite/80 font-medium tracking-widest mt-4">{{ dayName }}, {{
              monthName
            }}
            {{
              day
            }}, {{ year }}</p>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import TopBar from "@/components/NotelinkApp/TopBar.vue";
import {useMainStore} from "@/store";

export default {
  components: {TopBar},
  // emits: ['open-sidebar'],
  data() {
    const currentDate = new Date();
    return {
      isOpenMenu: false,
      currentDate: currentDate,
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      open: false,
      activeBannerIndex: 0,
      bannerClasses: ['banner-1', 'banner-2', 'banner-3']
    };
  },
  computed: {
    monthName() {
      const options = {month: 'long'};
      return this.currentDate.toLocaleString('en-US', options);
    },
    dayName() {
      const options = {weekday: 'long'};
      return this.currentDate.toLocaleString('en-US', options);
    },
    activeBannerClass() {
      return this.bannerClasses[this.activeBannerIndex];
    },
    userName() {
      useMainStore().loadUserName()
      return useMainStore().getName
    }
  },
  methods: {
    openSidebar() {
      this.$emit('open-sidebar')
    },
    removeAll() {
      localStorage.clear()
      useMainStore().setIsLoggedInFalse()
      location.reload();
    },
    previousBanner() {
      this.activeBannerIndex = (this.activeBannerIndex - 1 + this.bannerClasses.length) % this.bannerClasses.length;
    },
    nextBanner() {
      this.activeBannerIndex = (this.activeBannerIndex + 1) % this.bannerClasses.length;
    },
  }
  // methods: {
  //   openSidebar() {
  //     if (this.open === false) {
  //       this.open = true
  //     }
  //     this.$emit('open-sidebar', this.open)
  //   },
  // }
};
</script>

<style scoped>
.small-menu {
  border-radius: 12px 12px 12px 12px;
}

.banner-1 {
  background-image: url("@/assets/img/man-working-on-laptop.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner-2 {
  background-image: url("@/assets/img/woman-taking-notes.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner-3 {
  background-image: url("@/assets/img/take-risk.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Define CSS classes for the enter and leave transitions */
.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 0.3s;
}

.banner-fade-enter,
.banner-fade-leave-to /* .banner-fade-leave-active in <2.1.8 */
{
  opacity: 0;
}
</style>