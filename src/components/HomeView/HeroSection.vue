<template>
  <section class="px-6 mt-6 max-w-[1360px] mx-auto flex flex-col-reverse lg:flex-row items-center">
    <div>
      <p class="hidden lg:inline p-2 rounded-md bg-orange/20 text-md font-bold text-darkOrange">#BasicNotesApp</p>
      <h1 class="font-semibold text-4xl lg:text-[42px] mt-8 lg:mt-12">Conecting Ideas, <br>Unleashing <strong
          :style="{fontFamily: 'Mynerve'}"
          class="font-bold text-darkOrange text-3xl">Potential.</strong>
      </h1>
      <p class="mt-6 font-medium text-md">NoteLink: A Basic Note-Taking App to Showcase My Web Development Skills.</p>
      <!--      <div class="hidden md:flex mt-12 gap-16">-->
      <!--        <span class="flex gap-2 items-center"><img src="../../assets/img/icons/check-square.svg"-->
      <!--                                                   class="bg-orange/20 p-2 rounded-3xl w-8"><p-->
      <!--            class="font-medium text-sm">EASY TO USE</p></span>-->
      <!--        <span class="flex gap-2 items-center"><img src="../../assets/img/icons/dollar-sign.svg"-->
      <!--                                                   class="bg-orange/20 p-2 rounded-3xl w-8"><p-->
      <!--            class="font-medium text-sm">FREE FOR ALL</p></span>-->
      <!--      </div>-->
      <div class="mt-6 flex flex-col gap-2">

        <router-link to="/notelink/home">
          <div class=" flex items-center py-3 px-2 border border-gray-200 rounded-md">
            <img src="../../assets/img/icons/arrow-right.svg" alt="" class="w-5">
            <p class="text-sm font-semibold flex justify-center w-full">
              Try for free
            </p>
          </div>
        </router-link>

        <div class=" flex items-center py-3 px-2 rounded-md bg-orange">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFFDFA"
               stroke="#FFFDFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-github">
            <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <p class="text-sm font-semibold flex justify-center w-full text-orangeWhite">
            See my other work
          </p>
        </div>
      </div>
    </div>

    <div class="animate__animated animate__pulse"><img src="../../assets/img/hero-section-img.png"
                                                       alt="smartphone showing the NoteLink app"></div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>

</style>