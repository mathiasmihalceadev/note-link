<template>
  <div class="md:hidden flex justify-between items-start pt-6">
    <div @click="openSidebar" class="bars"><img class="w-7" src="@/assets/img/icons/menu.svg" alt=""></div>
    <transition name="diagonala" appear>
      <div :class="{'rounded-menu': isRounded}" class="bg-orangeBlack rounded-md absolute right-0 px-4 py-2 mr-4">
        <div class="items-center gap-2 flex">
          <p class=" text-[14px] font-medium text-orangeWhite tracking-wide">{{ userName }}
          </p>
          <img @click="openMenu" class="w-4 cursor-pointer"
               src="@/assets/img/icons/chevron-down.svg" alt="">
        </div>
        <div v-if="isOpenMenu">
          <ul class="cursor-pointer text-orangeWhite/80 text-[13px] pb-1">
            <li class="hover:text-orangeWhite transition-all duration-100">Edit banner</li>
            <li @click="removeAll" class="hover:text-orangeWhite transition-all duration-100">Change user</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {useMainStore} from "@/store";

export default {
  data() {
    return {
      isOpenMenu: false,
      isRounded: true
    }
  },
  computed: {
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
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu
      this.isRounded = !this.isRounded
    }
  }
}
</script>

<style>
.rounded-menu {
  border-radius: 100px;
}

.semirounded-menu {
  border-radius: 12px;
}
</style>