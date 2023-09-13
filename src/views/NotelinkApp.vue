<template>
  <!--  <div v-if="isLoading" class="loader-container animate__animated animate__fadeIncd">-->
  <!--    <div class="loader"></div>-->
  <!--  </div>-->

  <div v-if="isLoading" class="loader-container animate__animated animate__fadeIn">
    <img class="w-24 h-24" src="@/assets/GIF/loader.gif" alt="">
  </div>

  <section class="side-bar flex relative" v-else>
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
    }, 3000)
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
