<template>
  <section
      class="bg-orangeWhite h-screen overflow-scroll overflow-x-hidden px-6 flex-1 md:pt-8 animate__animated animate__fadeIn">
    <top-bar class="mb-12" @open-sidebar="openSidebar"></top-bar>
    <div class="md:p-6">
      <div class="flex gap-4 items-end mb-2">
        <h2 class="font-semibold text-4xl leading-none">Notes</h2>
        <p class="bg-orangeGray/50 text-orangeWhite text-lg font-medium px-2 rounded-full cursor-default select-none">
          {{ notes.length }}</p>
        <div class="hover:scale-110 transition-all duration-200 cursor-pointer"
             @click="setComponent('NoteModal')">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
               stroke="#120F0D"
               stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-plus leading-none">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
      <div class="mb-4">
        <ul>
          <li @click="selectTag(tag.name)" :class="{orange: copyTags[tag.name]}"
              class="text-[12px] inline-block mr-1 mb-1 bg-orangeGray/10 font-semibold px-2 py-1 rounded-md hover:cursor-pointer transition-all duration-300"
              v-for="tag in tags" :key="tag.id">
            {{ tag.name }}
          </li>
        </ul>
      </div>

      <filtered-notes :tagsData="copyTags" @view-note="viewNote"></filtered-notes>
    </div>
  </section>
  <component @close-modal="closeComponent" :is="component"></component>
  <note-view v-if="currentNote" :current="currentNote" @close-modal="closeModal"></note-view>
</template>

<script>
import AllNotes from "@/components/NotelinkApp/HomeSection/AllNotes.vue";
import TopBar from "@/components/NotelinkApp/TopBar.vue";
import NoteModal from "@/components/NotelinkApp/HomeSection/Modals/NoteModal.vue";
import NoteView from "@/components/NotelinkApp/HomeSection/Modals/NoteView.vue";
import {useMainStore} from "@/store";
import {ref, watchEffect} from "vue";
import FilteredNotes from "@/components/NotelinkApp/HomeSection/FilteredNotes.vue";

export default {
  emits: ['open-sidebar'],
  data() {
    return {
      component: '',
      currentNote: null,
      copyTags: {}
    }
  },
  components: {FilteredNotes, NoteView, TopBar, AllNotes, NoteModal},
  methods: {
    openSidebar() {
      this.$emit('open-sidebar')
    },
    closeComponent() {
      this.component = ''
    },
    setComponent(component) {
      this.component = component
    },
    closeModal() {
      this.currentNote = null
    },
    viewNote(id) {
      const mainStore = useMainStore()
      const notes = mainStore.getNotes

      this.currentNote = notes.find((element) => element.id === id)

      console.log('heyy')
    },
    selectTag(name) {
      this.copyTags[name] = !this.copyTags[name];
      console.log(this.copyTags);
    }
  },
  setup() {
    const mainStore = useMainStore()
    const notes = ref(mainStore.getNotes)
    const tags = ref(mainStore.getTags)

    mainStore.loadNotes()
    mainStore.loadTags()

    watchEffect(() => {
      notes.value = mainStore.getNotes
      tags.value = mainStore.getTags
    });

    return {
      notes, tags
    }
  }
}
</script>

<style scoped>
.orange {
  background-color: #F4BA50 !important;
  color: white;
}
</style>