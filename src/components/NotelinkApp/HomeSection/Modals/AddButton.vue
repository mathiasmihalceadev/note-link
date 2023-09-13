<template>
  <div>
    <div @click="toggleAddMenu" ref="addButton"
         class="hover:scale-105 cursor-pointer transition-all duration-300 fixed flex right-4 bottom-6 md:bottom-10 md:right-10 bg-orange justify-between items-center p-4 gap-12 rounded-full box-shadow-btn">
      <img class="w-6 md:w-8" src="../../../../assets/img/icons/plus.svg" alt="">
    </div>
    <div ref="addMenuRef" v-if="addMenu"
         class="absolute right-4 box-shadow-sm rounded-md bottom-20 bg-white p-4 mb-2 md:bottom-24 md:right-10 md:mb-6 animate__animated animate__fadeIn">
      <ul class="text-lg font-medium flex flex-col gap-4">
        <li @click="setComponent('NoteModal')"
            class="hover:scale-105 cursor-pointer transition-all duration-300 flex items-center gap-3">
          <img class="w-6 h-6" src="../../../../assets/img/icons/writing.png" alt="">
          <p>Notes</p>
        </li>
        <li class="hover:scale-105 cursor-pointer transition-all duration-300 flex items-center gap-3"
            @click="setComponent('TodoModal')">
          <img class="w-6 h-6" src="../../../../assets/img/icons/checklist.png" alt="">
          <p>To do</p>
        </li>
        <li class="hover:scale-105 cursor-pointer transition-all duration-300 flex items-center gap-3">
          <img class="w-6 h-6" src="../../../../assets/img/icons/textbook.png" alt="">
          <p>Journal</p>
        </li>
        <li @click="setComponent('TagModal')"
            class="hover:scale-105 cursor-pointer transition-all duration-300 flex items-center gap-3">
          <img class="w-6 h-6" src="../../../../assets/img/icons/price-tag.png" alt="">
          <p>Tags</p>
        </li>
      </ul>
    </div>
  </div>
  <component @close-modal="closeComponent" :is="component"></component>
</template>

<script>
import TagModal from "@/components/NotelinkApp/HomeSection/Modals/TagModal.vue";
import NoteModal from "@/components/NotelinkApp/HomeSection/Modals/NoteModal.vue";
import TodoModal from "@/components/NotelinkApp/HomeSection/Modals/TodoModal.vue";

export default {
  components: {
    TagModal,
    NoteModal,
    TodoModal
  },
  data() {
    return {
      addMenu: false,
      component: ''
    }
  },
  methods: {
    toggleAddMenu() {
      this.addMenu = this.addMenu !== true;
    },
    setComponent(component) {
      this.component = component
      this.addMenu = false
    },
    handleClickOutside() {
      const addButton = this.$refs.addButton
      const addMenu = this.$refs.addMenuRef

      if (addButton && !addButton.contains(event.target) && addMenu && !addMenu.contains(event.target)) {
        this.addMenu = false
      }
    },
    closeComponent() {
      this.component = ''
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style>
.box-shadow-btn {
  -webkit-box-shadow: 0px 0px 43px -3px rgba(0, 0, 0, 0.29);
  box-shadow: 0px 0px 43px -3px rgba(0, 0, 0, 0.29);
}

.animate__animated.animate__fadeIn {
  --animate-duration: 0.3s;
}
</style>
