<template>
  <section
      class="bg-orangeWhite h-screen overflow-scroll overflow-x-hidden px-6 flex-1 md:pt-8 animate__animated animate__fadeIn">
    <top-bar class="mb-12" @open-sidebar="openSidebar"></top-bar>
    <div class="md:p-6">
      <div class="flex gap-4 items-end mb-4">
        <h2 class="font-semibold text-4xl leading-none">Todos</h2>
        <p class="bg-orangeGray/50 text-orangeWhite text-lg font-medium px-2 rounded-full cursor-default select-none">
          {{ todos.length }}</p>
        <div class="hover:scale-110 transition-all duration-200 cursor-pointer"
             @click="setComponent('TodoModal')">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
               stroke="#120F0D"
               stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-plus leading-none">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
      <all-todos></all-todos>
    </div>
  </section>
  <component @close-modal="closeComponent" :is="component"></component>
</template>
<script>
import TopBar from "@/components/NotelinkApp/TopBar.vue";
import AllTodos from "@/components/NotelinkApp/HomeSection/AllTodos.vue";
import TodoModal from "@/components/NotelinkApp/HomeSection/Modals/TodoModal.vue";
import {useMainStore} from "@/store";
import {ref, watchEffect} from "vue";

export default {
  emits: ['open-sidebar'],
  components: {TopBar, AllTodos, TodoModal},
  data() {
    return {
      component: '',
    }
  },
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