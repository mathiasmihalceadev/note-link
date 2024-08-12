<template>
  <transition name="diagonala" appear>
    <div class="flex md:h-full px-6 mb-8 md:mb-0 md:pr-12 md:pl-3 col-span-1">
      <div
          class="flex-grow box-shadow bg-orangeWhite p-6 rounded-lg box-shadow-hover hover:-translate-y-0.5 transition-all duration-300 relative">
        <div class="flex items-center justify-between mb-4">
          <div class="flex gap-4">
            <h3 class="font-semibold text-2xl">Quick Note</h3>
            <!--          <img src="@/assets/img/pin.png" alt="" class="w-8 h-8">-->
          </div>
          <div class="hover:bg-orangeGray/10 rounded-full cursor-pointer" @click="showMore" ref="showMoreButton">
            <img class="p-1 w-8" src="@/assets/img/icons/more-horizontal.svg" alt="">
          </div>
          <div v-if="showMoreMenu"
               class="bg-orangeWhite py-1 absolute right-6 top-[59px] rounded-md box-shadow-sm animate__animated animate__fadeIn z-10"
               ref="menu">
            <ul class="text-[14px] text-orangeBlack/80 font-semibold">
              <li @click="editQuickNote" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1">Edit</li>
              <li @click="deleteQuickNote" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1">Delete</li>
            </ul>
          </div>
        </div>

        <div>
          <input v-if="!showTitle" placeholder="Title goes here..." type="text"
                 class="w-full mb-1 text-lg focus:outline-none font-semibold" v-model="quickNote.title"
                 @blur="onTitleBlur">
          <p class="text-xl mb-1 font-medium" v-else> {{ quickNote.title }}</p>
          <input v-if="!showText" placeholder="Write something fast..." type="text"
                 class="w-full text-md focus:outline-none" v-model="quickNote.text" @blur="onTextBlur"/>
          <p v-else> {{ quickNote.text }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      quickNote: {
        title: '',
        text: ''
      },
      showTitle: false,
      showText: false,
      showMoreMenu: false,
    }
  },
  methods: {
    onTitleBlur() {
      if (this.quickNote.title) {
        localStorage.setItem('quickNoteTitle', this.quickNote.title)
        this.showTitle = true
      }
    },
    onTextBlur() {
      if (this.quickNote.text) {
        localStorage.setItem('quickNoteText', this.quickNote.text)
        this.showText = true
      }
    },
    showMore() {
      this.showMoreMenu = !this.showMoreMenu;
    },
    deleteQuickNote() {
      localStorage.removeItem('quickNoteTitle')
      localStorage.removeItem('quickNoteText')
      this.quickNote.title = ''
      this.quickNote.text = ''
      this.showTitle = false
      this.showText = false
    },
    editQuickNote() {
      this.showTitle = false
      this.showText = false
    },
    handleClickOutside() {
      const menu = this.$refs.menu
      const showMoreButton = this.$refs.showMoreButton

      if (menu && !menu.contains(event.target) && showMoreButton && !showMoreButton.contains(event.target)) {
        this.showMoreMenu = false
      }
    }
  },
  mounted() {
    const savedTitle = localStorage.getItem('quickNoteTitle')
    const savedText = localStorage.getItem('quickNoteText')
    if (savedTitle) {
      this.quickNote.title = savedTitle
      this.showTitle = true
    }
    if (savedText) {
      this.quickNote.text = savedText
      this.showText = true
    }
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
}
</script>

<style scoped>
::placeholder {
  font-style: italic;
}

.animate__animated.animate__fadeIn {
  --animate-duration: 0.3s;
}
</style>