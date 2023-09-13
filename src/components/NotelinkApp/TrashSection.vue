<template>
  <section
      class="bg-orangeWhite h-screen overflow-scroll overflow-x-hidden flex-1 md:pt-8 animate__animated animate__fadeIn">
    <top-bar class="px-6 mb-12" @open-sidebar="openSidebar"></top-bar>
    <div class="px-6 md:pt-6 md:pr-12 md:pl-12">
      <div class="relative flex justify-between items-center mb-4">
        <h3 class="font-semibold text-4xl">Trash</h3>
        <div class="hover:bg-orangeGray/10 rounded-full cursor-pointer" @click="showTheMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-more-horizontal p-1">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
        <div v-if="theMenu"
             class="bg-orangeWhite py-1 absolute right-0 top-10 rounded-md box-shadow-sm animate__animated animate__fadeIn z-10"
             ref="menu">
          <ul class="text-[14px] text-orangeBlack/80 font-semibold">
            <li @click="deleteAllNotes" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1">Empty trash
            </li>
          </ul>
        </div>
      </div>
      <p v-if="notes.length === 0">Nothing to see in the trash right now.</p>
      <div>
        <ul class="relative text-black rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 z-0">
          <li v-for="note in notes" :key="note.id"
              @mouseenter="showMore(note.id)"
              @mouseleave="dontShowMore(note.id)"
              class="relative note border-[1px] border-orangeBlack/20 p-4 rounded-sm transition-all duration-200 cursor-pointer animate__animated animate__fadeInLeft">
            <img v-if="mouseOver[note.id]" @click="showSmallMenu(note.id)"
                 class="absolute w-7 top-2 right-3 hover:rounded-full hover:bg-orangeBlack/10 hover:cursor-pointer p-1 animate__animated animate__fadeIn common"
                 src="@/assets/img/icons/more-horizontal.svg" alt="">
            <div v-if="showMoreMenu[note.id]"
                 class="py-1 bg-orangeWhite absolute right-4 top-10 rounded-md box-shadow-sm animate__animated animate__fadeIn z-50 common"
                 ref="menu">
              <ul class="text-[14px] text-orangeBlack/80 font-semibold common">
                <li @click="restoreNote(note.id)" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">
                  Restore
                </li>
                <li @click="deleteNote(note.id)" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">Delete
                </li>
              </ul>
            </div>
            <div class="flex flex-col justify-between h-full gap-4">
              <div>
                <p class="font-medium text-lg">{{ note.title }}</p>
                <div class="flex gap-2 overflow-x-hidden">
                  <p v-for="tag in note.tags" :key="tag"
                     class="inline text-[11px] bg-orangeGray/10 font-medium px-2 py-1 rounded-md"
                  >{{
                      tag
                    }}</p>
                </div>
                <p class="mt-2 text-[14px]">{{
                    note.text.length > 300 ? `${note.text.slice(0, 300)}...` : note.text
                  }}</p>
              </div>
              <div>
                <p class="uppercase text-[12px] text-orangeBlack/40 font-semibold">{{ note.day }} {{ note.month }},
                  {{ note.year }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>


<script>
import {useMainStore} from "@/store";
import {ref, watchEffect} from "vue";
import TopBar from "@/components/NotelinkApp/TopBar.vue";

export default {
  components: {TopBar},
  data() {
    return {
      mouseOver: {},
      showMoreMenu: {},
      theMenu: false,
    }
  },
  methods: {
    showTheMenu() {
      this.theMenu = !this.theMenu
    },
    showMore(noteId) {
      this.mouseOver[noteId] = true;
    },
    dontShowMore(noteId) {
      this.mouseOver[noteId] = false;
    },
    showSmallMenu(noteId) {
      for (const otherNoteId in this.showMoreMenu) {
        if (otherNoteId !== noteId) {
          this.showMoreMenu[otherNoteId] = false;
        }
      }
      this.showMoreMenu[noteId] = !this.showMoreMenu[noteId];
    },
    restoreNote(noteId) {
      const data = localStorage.getItem('notes')
      let existingNotes = []
      if (data) {
        existingNotes = JSON.parse(data)
      }

      const goodNote = existingNotes.find(item => item.id === noteId)
      goodNote.trash = false

      localStorage.setItem('notes', JSON.stringify((existingNotes)))
      const mainStore = useMainStore()
      mainStore.loadTrash()
      mainStore.loadNotes()
    },
    deleteNote(noteId) {
      const data = localStorage.getItem('notes')
      let existingNotes = []
      if (data) {
        existingNotes = JSON.parse(data)
      }

      existingNotes = existingNotes.filter(item => item.id !== noteId);

      localStorage.setItem('notes', JSON.stringify(existingNotes))

      const mainStore = useMainStore()
      mainStore.loadTrash()
      mainStore.loadNotes()
    },
    deleteAllNotes() {
      const data = localStorage.getItem('notes')
      let existingNotes = []
      if (data) {
        existingNotes = JSON.parse(data)
      }

      const goodNotes = existingNotes.filter(obj => !obj.trash)

      localStorage.setItem('notes', JSON.stringify(goodNotes))

      const mainStore = useMainStore()
      mainStore.loadTrash()
      this.theMenu = false
    },
    openSidebar() {
      this.$emit('open-sidebar')
    }
  },
  setup() {
    const mainStore = useMainStore()
    const notes = ref(mainStore.getTrash)

    mainStore.loadTrash();

    console.log(notes)

    watchEffect(() => {
      notes.value = mainStore.getTrash
    });

    return {
      notes,
    }
  }
}
</script>