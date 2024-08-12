<template>
  <section
      class="bg-orangeWhite h-screen overflow-scroll overflow-x-hidden flex-1 md:pt-8 px-6 animate__animated animate__fadeIn">
    <top-bar class="mb-12" @open-sidebar="openSidebar"></top-bar>
    <div class="md:pl-6 md:pt-6">
      <h2 class="mb-4 font-semibold text-4xl">Journal</h2>
      <p>Coming soon.</p>
    </div>
  </section>
</template>

<script>
import TopBar from "@/components/NotelinkApp/TopBar.vue";

export default {
  components: {TopBar},
  methods: {
    openSidebar() {
      this.$emit('open-sidebar')
    }
  }
}
</script>