<template>
  <transition name="slide">
    <aside v-if="isOpen || !isMobile"
           class="w-[256px] absolute md:static md:w-[68px] md:flex lg:w-[256px] bg-black flex flex-col justify-between h-screen top-0 left-0 overflow-x-hidden z-50">
      <div>
        <div class="flex px-6 md:px-0 md:flex items-center justify-center py-6">
          <img @click="closeSidebar" class="md:hidden w-8" src="@/assets/img/icons/chevron-left.svg" alt="">
          <router-link to="/">
            <img class="w-60 p-4 md:p-8 md:hidden lg:block" src="@/assets/img/logo/NoteLink-Logo-White.png"
                 alt="">
            <img class="hidden w-11 md:block lg:hidden " src="@/assets/img/logo/tablet-logo.png" alt="">
          </router-link>
        </div>
        <hr class="w-52 mx-auto md:w-12 lg:w-52" style="border-color: #44413C">
        <div class="relative">
          <input type="text" placeholder="Search..."
                 class="bg-orangeGray text-orangeWhite w-52 p-2 pl-10 text-sm ml-6 mt-8 rounded-md outline-none focus:shadow-outline md:hidden lg:block"
                 @input="handleSearchInput">
          <img src="@/assets/img/icons/search.svg"
               class="text-orangeGray absolute bottom-2 left-6 pl-2 md:static md:pl-6 md:mt-6 lg:mt-0 lg:absolute lg:pl-2"
               alt="">
        </div>
        <div class="mt-8">
          <ul class="flex flex-col gap-2">

            <router-link :to="{name: 'notes-home'}">
              <li class="flex gap-4 items-center pl-6 py-3"><img class="w-5" src="@/assets/img/icons/home.svg" alt="">
                <p class="text-sm text-orangeWhite font-medium md:hidden lg:block">Home</p></li>
            </router-link>

            <router-link to="notifications">
              <li class="flex gap-4 items-center pl-6 py-3"><img class="w-5" src="@/assets/img/icons/bell.svg" alt="">
                <p class="text-sm text-orangeWhite font-medium md:hidden lg:block">Notifications</p></li>
            </router-link>


            <li class="pl-6 pr-4 py-3">
              <div class="flex gap-3 items-center justify-between cursor-pointer" @click="toggleMenu">
                <div class="flex gap-4 items-center">
                  <img class="w-5" src="@/assets/img/icons/archive.svg" alt="">
                  <p class="text-sm text-orangeWhite font-medium md:hidden lg:block">All</p>
                </div>
                <div v-if="open" class="cursor-pointer md:hidden lg:block"><img class="w-4"
                                                                                src="@/assets/img/icons/chevron-up.svg"
                                                                                alt=""></div>
                <div v-else class="cursor-pointer md:hidden lg:block"><img class="w-4"
                                                                           src="@/assets/img/icons/chevron-down.svg"
                                                                           alt="">
                </div>
              </div>
            </li>


            <div v-if="open"
                 class="text-sm text-orangeWhite font-medium flex flex-col gap-2 animate__animated animate__fadeIn">
              <router-link to="notes">
                <div class="sublink py-3 pl-[60px] flex items-center justify-between pr-4">
                  <p class="leading-none">Notes</p>
                  <p class="bg-orange/50 text-orangeWhite text-[11px] leading-none font-medium px-2 py-1 rounded-full cursor-default select-none">
                    {{ notes.length }}</p>
                </div>
              </router-link>
              <router-link to="todos">
                <div class="sublink py-3 pl-[60px] flex items-center justify-between pr-4">
                  <p class="leading-none">Todos</p>
                  <p class="bg-orange/50 text-orangeWhite text-[11px] leading-none font-medium px-2 py-1 rounded-full cursor-default select-none">
                    {{ todos.length }}</p>
                </div>
              </router-link>
              <router-link to="journal">
                <div class="sublink py-3 pl-[60px] flex items-center justify-between pr-4">
                  <p class="leading-none">Journal</p>
                </div>
              </router-link>
            </div>
            <router-link to="trash">
              <li class="flex gap-4 items-center pl-6 py-3"><img class="w-5" src="@/assets/img/icons/trash-2.svg"
                                                                 alt="">
                <p class="text-sm text-orangeWhite font-medium md:hidden lg:block">Trash</p></li>
            </router-link>

            <li class="flex gap-4 items-center pl-6 py-3"><img class="w-5" src="@/assets/img/icons/settings.svg" alt="">
              <p class="text-sm text-orangeWhite font-medium md:hidden lg:block">Settings</p></li>

          </ul>
        </div>
      </div>
      <div>
        <hr style="border-color: #44413C">
        <div class="py-4 flex gap-4 items-center pl-6"><img class="w-5" src="@/assets/img/icons/help-circle.svg" alt="">
          <p class="text-sm text-orangeWhite font-medium md:hidden lg:block">Need a little help?</p></div>
      </div>
    </aside>
  </transition>
</template>

<script>
import NotesArchive from "@/components/NotelinkApp/NotesArchive.vue";
import {useMainStore} from "@/store";
import {ref, watchEffect} from "vue";

export default {
  emits: ['search-input'],
  computed: {
    NotesArchive() {
      return NotesArchive
    }
  },
  props: ['isOpen'],
  data() {
    return {
      open: false,
      close: true,
      isMobile: false,
      isNote: false,
      allComponent: null,
    }
  },
  methods: {
    handleSearchInput(event) {
      const inputValue = event.target.value;

      if (inputValue.trim() !== '') {
        this.$router.push({name: 'SearchResults'});
        this.$emit('search-input', inputValue);
      } else {
        this.$router.push({name: 'notes-home'})
      }
    },
    changeColor() {
      this.isNote = !this.isNote
    },
    toggleMenu() {
      this.open = !this.open
    },
    closeSidebar() {
      this.$emit('close-sidebar')
    },
    checkMobile() {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      this.isMobile = mediaQuery.matches;

      mediaQuery.addListener((event) => {
        this.isMobile = event.matches;
      });
    },
    setComponent(component) {
      if (component === 'NotesArchive') {
        this.$emit('allComponent', component)
      }
    },
  },
  mounted() {
    this.checkMobile()
  },
  setup() {
    const mainStore = useMainStore()
    const notes = ref(mainStore.getNotes)
    const tags = ref(mainStore.getTags)
    const todos = ref(mainStore.getTasks)

    mainStore.loadTags();
    mainStore.loadNotes()
    mainStore.loadTasks()

    watchEffect(() => {
      tags.value = mainStore.getTags;
      notes.value = mainStore.getNotes;
      todos.value = mainStore.getTasks
    });

    return {
      notes, tags, todos
    }
  }
}
</script>

<style scoped>


::placeholder {
  color: #FFFDFA;
}

.router-link-active {
  background-color: #1E1C1A;
  border-left: 4px solid #F4BA50;
}

.router-link-active li {
  margin-left: -4px;
}

.router-link-active .sublink {
  margin-left: -4px;
}

</style>
