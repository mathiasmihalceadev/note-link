<template>
  <section>
    <div class="flex flex-col gap-6 mt-12 mx-auto max-w-[1360px] lg:flex-row gap-12 px-6">
      <div class="rounded-lg flex-1 bg-darkOrange p-4 animate__animated animate__fadeInDown">
        <div class="flex gap-2">
          <h3 class="text-white font-bold text-7xl">{{ numberA }}</h3>
          <p class="text-white font-bold text-[36px] leading-[34px]"> % positive<br> feedback</p>
        </div>
        <p class="mt-2 text-white text-[20px] leading-[28px]">rating from users who reported an increase in productivity
          by 20% after
          using
          the app for
          just one week.</p>
      </div>
      <div class="rounded-lg flex-1 bg-blackOrange p-4 animate__animated animate__fadeInDown">
        <div class="flex gap-2">
          <h3 class="text-white font-bold text-7xl">{{ numberB }}</h3>
          <p class=" text-white font-bold text-[36px] leading-[34px]">days<br>in total</p>
        </div>
        <p class="mt-2 text-white text-[20px] leading-[28px]">of consistent work to bring NoteLink from concept to
          completion.</p>
      </div>
      <div class="rounded-lg flex-1 bg-orange p-4 animate__animated animate__fadeInDown">
        <div class="flex gap-2">
          <h3 class="text-white font-bold text-7xl">{{ numberC }}</h3>
          <p class="text-white font-black text-[24px] leading-[34px]">% faster retrieval<br>of information </p>
        </div>
        <p class="mt-2 text-white text-[20px] leading-[28px]">spent approximately by the average NoteLink user
          organizing
          and
          categorizing
          their
          notes.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      numberA: 0,
      numberB: 0,
      numberC: 0
    }
  },
  mounted() {
    this.increaseNumberA()
    this.increaseNumberB()
    this.increaseNumberC()
  },
  methods: {
    increaseNumberA() {
      setInterval(() => {
        if (this.numberA < 97) {
          this.numberA++
        }
      }, 10)
    },
    increaseNumberB() {
      setInterval(() => {
        if (this.numberB < 25) {
          this.numberB++
        }
      }, 30)
    },
    increaseNumberC() {
      setInterval(() => {
        if (this.numberC < 30) {
          this.numberC++
        }
      }, 20)
    }
  }
}
</script>