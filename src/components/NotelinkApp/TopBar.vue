<template>
  <div class="md:hidden flex justify-between items-start pt-6 relative">
    <div @click="openSidebar"><img src="@/assets/img/icons/menu.svg" alt=""></div>
    <transition name="diagonala" appear>
      <div class="bg-orangeBlack small-menu p-2">
        <div class="items-center gap-2 flex mb-1">
          <p class=" text-[15px] font-semibold text-orangeWhite tracking-wide">Mathias Mihalcea
          </p>
          <img @click="isOpenMenu = !isOpenMenu" class="mr-1 cursor-pointer"
               src="@/assets/img/icons/chevron-down.svg" alt="">
        </div>
        <div v-if="isOpenMenu">
          <ul class="cursor-pointer text-orangeWhite/80 text-[13px]">
            <li class="hover:text-orangeWhite transition-all duration-100">Edit banner</li>
            <li class="hover:text-orangeWhite transition-all duration-100">Change user</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpenMenu: false
    }
  },
  methods: {
    openSidebar() {
      this.$emit('open-sidebar')
    }
  }
}
</script>

<style>
.small-menu {
  border-radius: 12px 12px 12px 12px;
}
</style>