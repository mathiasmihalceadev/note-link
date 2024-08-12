<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 animate__animated animate__fadeIn"></div>
  <div class="fixed inset-0 flex items-center justify-center z-50 animate__animated animate__fadeIn">
    <div class="bg-white mx-2 p-6 box-shadow rounded-md absolute">
      <img @click="closeModal" class="absolute right-2 top-2 hover:cursor-pointer"
           src="../../../../assets/img/icons/x.svg"
           alt="">
      <h2 class="text-2xl font-semibold">Add tags</h2>
      <p class="mb-2 text-[14px]">Add useful tags that can help you sort your notes.</p>
      <div class="mb-6 ">
        <input placeholder="#fun, #important" type="text"
               class="mb-2 text-orangeBlack rounded-md border-0 py-2 px-2 outline-0 w-full"
               v-model="tag.name"
               :class="{errorClass: error }"
               @input="clearError">
        <p v-if="error" class="mb-6 text-sm text-rose-600">Add at least one letter to the tag</p>
      </div>
      <div class="flex gap-2 justify-end">
        <button @click="closeModal"
                class="px-4 py-2 bg-white border-[1.5px] border-orangeBlack/20 rounded-lg font-semibold">Cancel
        </button>
        <button
            class="px-4 py-2 bg-orange text-orangeWhite rounded-lg font-semibold hover:bg-orange/90 transition-all duration-100"
            @click="addTag">
          Add Tag
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useMainStore} from "@/store";

export default {
  data() {
    return {
      tag: {id: '', name: ''},
      error: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    addTag() {
      const tagsStr = localStorage.getItem('tags')
      let tagsArray = []

      if (tagsStr) {
        tagsArray = JSON.parse(tagsStr)
      }

      this.tag.name = this.tag.name.trim().replace(/#/g, '');

      if (this.tag.name.trim() !== '') {
        const currentDate = new Date()
        this.tag.id = currentDate.toISOString()
        this.tag.name = '#' + this.tag.name.trim()
        tagsArray.push(this.tag)
      } else {
        this.error = true
        return
      }

      localStorage.setItem('tags', JSON.stringify(tagsArray))

      const mainStore = useMainStore()
      mainStore.loadTags()

      this.tag = {id: '', name: ''}

      this.$emit('closeModal')
    },
    clearError() {
      this.error = false;
    }
  },
}

</script>

<style scoped>
.errorClass {
  border: 2px solid rgb(225 29 72);
}

input:focus {
  outline: none;
}

::placeholder {
  font-weight: normal;
  font-style: italic;
}

</style>