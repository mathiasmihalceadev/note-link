<template>
  <header-main></header-main>
  <hero-section></hero-section>
  <numbers-cards></numbers-cards>
  <features-cards></features-cards>
</template>

<script>
// @ is an alias to /src

import HeaderMain from "@/components/HomeView/HeaderMain.vue";
import HeroSection from "@/components/HomeView/HeroSection.vue";
import NumbersCards from "@/components/HomeView/NumbersCards.vue";
import FeaturesCards from "@/components/HomeView/FeaturesCards.vue";


export default {
  name: 'HomeView',
  components: {HeaderMain, HeroSection, NumbersCards, FeaturesCards},
}
</script>
