<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 animate__animated animate__fadeIn"></div>
  <div class="fixed inset-0 flex items-center justify-center z-50 animate__animated animate__fadeIn">
    <div class="bg-white mx-2 p-6 box-shadow rounded-md absolute">
      <h2 class="text-2xl font-semibold">Tell us your name</h2>
      <div class="mb-6 ">
        <input placeholder="John Doe" type="text"
               class="mb-2 text-orangeBlack rounded-md border-0 py-2 px-2 outline-0 w-full italic"
               v-model="name"
               :class="{errorClass: error }"
               @input="clearError">
        <p v-if="error" class="mb-6 text-sm text-rose-600">Add at least one letter to your name.</p>
      </div>
      <button
          class="px-4 py-2 bg-orange text-orangeWhite rounded-lg font-semibold hover:bg-orange/90 transition-all duration-100"
          @click="addName">
        Okay
      </button>
    </div>
  </div>
</template>

<script>
import {useMainStore} from "@/store";

export default {
  data() {
    return {
      error: false,
      name: '',
    }
  },
  methods: {
    addName() {
      localStorage.setItem('name', this.name)
      useMainStore().setIsLoggedInTrue()
      useMainStore().loadUserName()
    }
  }
}
</script>