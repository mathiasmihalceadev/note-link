<template>
  <!--  <div v-if="isLoading" class="loader-container animate__animated animate__fadeIncd">-->
  <!--    <div class="loader"></div>-->
  <!--  </div>-->

  <!--  <div v-if="isLoading" class="loader-container animate__animated animate__fadeIn">-->
  <!--    <div class="sk-cube-grid">-->
  <!--      <div class="sk-cube sk-cube1"></div>-->
  <!--      <div class="sk-cube sk-cube2"></div>-->
  <!--      <div class="sk-cube sk-cube3"></div>-->
  <!--      <div class="sk-cube sk-cube4"></div>-->
  <!--      <div class="sk-cube sk-cube5"></div>-->
  <!--      <div class="sk-cube sk-cube6"></div>-->
  <!--      <div class="sk-cube sk-cube7"></div>-->
  <!--      <div class="sk-cube sk-cube8"></div>-->
  <!--      <div class="sk-cube sk-cube9"></div>-->
  <!--    </div>-->
  <!--  </div>-->

  <section class="side-bar flex relative">
    <side-bar @search-input="handleSearchInput" :is-open="isOpen" @close-sidebar="closeSidebar"></side-bar>
    <router-view :search-value="searchValue" @open-sidebar="openSidebar"></router-view>
    <add-button></add-button>
  </section>


</template>

<script>
import SideBar from "@/components/NotelinkApp/SideBar.vue";
import AddButton from "@/components/NotelinkApp/HomeSection/Modals/AddButton.vue";

export default {
  components: {SideBar, AddButton},
  data() {
    return {
      isLoading: true,
      // showSidebar: false,
      isOpen: false,
      searchValue: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },
  methods: {
    // openSidebar(open) {
    //   this.showSidebar = open
    //   console.log(this.showSidebar)
    // },
    openSidebar() {
      this.isOpen = true;
    },
    closeSidebar() {
      this.isOpen = false;
    },
    handleSearchInput(value) {
      this.searchValue = value
    },
  }
}
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sk-cube-grid {
  width: 40px;
  height: 40px;
  margin: 100px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: #F4BA50;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}


.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loader {
  width: 40px;
  height: 40px;
  display: grid;
}

.loader:before,
.loader:after {
  content: "";
  background: #EA9D0E;
  transform-origin: left;
  animation: sp4 2s infinite;
}

.loader:before {
  transform-origin: right;
  --s: -1;
}

@keyframes sp4 {
  0%,
  10% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(calc(var(--s, 1) * 50%), 0) scale(1);
  }
  66% {
    transform: translate(calc(var(--s, 1) * 50%), calc(var(--s, 1) * -50%)) scale(1);
  }
  90%,
  100% {
    transform: translate(calc(var(--s, 1) * 50%), calc(var(--s, 1) * -50%)) scale(0.5, 2);
  }
}

</style>
