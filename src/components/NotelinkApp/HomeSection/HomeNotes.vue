<template>
  <transition name="diagonala" appear>

    <div class="px-6 md:pr-12 md:pl-12 mb-12">
      <div
          class="col-span1 box-shadow bg-orangeWhite p-6 rounded-lg box-shadow-hover hover:-translate-y-0.5 transition-all duration-300">
        <div class="flex gap-4">
          <h3 class="font-semibold text-2xl">All</h3>
          <!--        <img src="@/assets/img/post-it.png" alt="" class="w-8 h-8">-->
        </div>
        <div class="mb-4">
          <ul class="flex gap-2 items-center">
            <li class="cursor-pointer" @click="setComponent('AllNotes')"><p :class="{orange: isActive.allNotes}"
                                                                            class="font-medium">Notes</p></li>
            <li class="cursor-pointer" @click="setComponent('AllTodos')"><p :class="{orange: isActive.allTodos}"
                                                                            class="font-medium">Todos</p></li>
            <li class="cursor-pointer" @click="setComponent('AllTags')"><p :class="{orange: isActive.allTags}"
                                                                           class="font-medium">Tags</p></li>
          </ul>
        </div>
        <component @view-note="viewNote" :is="component"></component>
      </div>
    </div>
  </transition>
  <note-view v-if="currentNote" :current="currentNote" @close-modal="closeModal"></note-view>
</template>

<script>
import AllNotes from "@/components/NotelinkApp/HomeSection/AllNotes.vue";
import AllTodos from "@/components/NotelinkApp/HomeSection/AllTodos.vue";
import NoteView from "@/components/NotelinkApp/HomeSection/Modals/NoteView.vue";
import {useMainStore} from "@/store";

export default {
  components: {NoteView, AllNotes, AllTodos},
  data() {
    return {
      component: 'AllNotes',
      isActive: {},
      currentNote: null,
    }
  },
  methods: {
    closeModal() {
      this.currentNote = null
    },
    setComponent(component) {
      this.component = component
      this.isActive = {}

      if (component === 'AllNotes') {
        this.isActive.allNotes = true
      } else if (component === 'AllTodos') {
        this.isActive.allTodos = true
      } else if (component === 'AllTags') {
        this.isActive.allTags = true
      }
    },
    viewNote(id) {
      const mainStore = useMainStore()
      const notes = mainStore.getNotes

      this.currentNote = notes.find((element) => element.id === id)

      console.log('heyy')
    },
  },
  mounted() {
    this.isActive.allNotes = true
  }
}
</script>

<style scoped>
.orange {
  color: #EA9D0E;
}
</style>


