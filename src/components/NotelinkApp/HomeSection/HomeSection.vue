<template>
  <section
      class="bg-orangeWhite h-screen overflow-scroll overflow-x-hidden flex-1">
    <home-banner @open-sidebar="openSidebar"></home-banner>
    <div class="mt-[-76px] grid md:mb-8 grid-cols-1 md:grid-cols-3">
      <quick-tips></quick-tips>
      <quick-note></quick-note>
    </div>
    <div>
      <home-notes></home-notes>
    </div>
    <div v-if="!isLoggedIn">
      <add-name></add-name>
    </div>
  </section>
</template>


<script>
import HomeBanner from "@/components/NotelinkApp/HomeSection/HomeBanner.vue";
import QuickTips from "@/components/NotelinkApp/HomeSection/QuickTips.vue";
import QuickNote from "@/components/NotelinkApp/HomeSection/QuickNote.vue";
import HomeNotes from "@/components/NotelinkApp/HomeSection/HomeNotes.vue";
import AddName from "@/components/NotelinkApp/HomeSection/AddName.vue";
import {useMainStore} from "@/store";

export default {
  components: {
    HomeBanner,
    QuickTips,
    QuickNote,
    HomeNotes,
    AddName
  },
  data() {
    return {
      note: {id: '', day: '', month: '', year: '', title: '', tags: [], text: '', trash: false},
    }
  },
  methods: {
    openSidebar() {
      this.$emit('open-sidebar')
    },
  },
  computed: {
    isLoggedIn() {
      return useMainStore().getIsLoggedIn
    }
  },
  mounted() {
    const mainStore = useMainStore()
    useMainStore().loadIsLoggedIn()
    if (!mainStore.getIsLoggedIn) {
      let notes = [];

      const currentDate = new Date()
      this.note.id = currentDate.toISOString()

      const options = {month: 'long'};
      this.note.month = currentDate.toLocaleString('en-US', options);

      this.note.day = currentDate.getDate()
      this.note.year = currentDate.getFullYear()

      this.note.tags = ['#Inspiration', '#SelfDiscovery']

      this.note.text = 'Life is a grand adventure filled with opportunities for self-discovery. Every day brings new experiences, challenges, and chances to learn and grow. Embrace the unknown with an open heart, for it is in those moments of uncertainty that you truly find yourself. Trust in your inner strength and intuition. Believe in your ability to overcome obstacles. Your journey is a canvas waiting for your unique masterpiece. Seize the day and paint it with your dreams and aspirations. #Inspiration #SelfDiscovery'
      this.note.title = 'Embrace the Journey of Self-Discovery'

      notes.push(this.note);

      localStorage.setItem('notes', JSON.stringify(notes));

      let tags = []
      const tagOne = {name: "#Inspiration", id: 'tag-1'}
      const tagTwo = {name: "#SelfDiscovery", id: 'tag-2'}

      tags.push(tagOne)
      tags.push(tagTwo)

      localStorage.setItem('tags', JSON.stringify(tags))

      let tasks = [];
      const task = {}

      task.name = "To-Do List #1"

      task.id = "task-1"

      task.todos = [
        {id: "todo-1", value: "Pick up fresh vegetables", status: false},
        {id: "todo-2", value: "Schedule a meeting with the marketing team", status: false},
        {id: "todo-3", value: "Drop off dry cleaning", status: false},
        {id: "todo-4", value: "Schedule a dentist appointment", status: false},
        {id: "todo-5", value: "Go for a 30-minute jog", status: false},
        {id: "todo-6", value: "Start reading \"The Great Gatsby\"", status: false},
      ]

      tasks.push(task)

      localStorage.setItem('tasks', JSON.stringify(tasks))

      const mainStore = useMainStore()
      mainStore.loadNotes()
      mainStore.loadTags()
      mainStore.loadTasks()
      mainStore.setIsLoggedInFalse()
    }
  }
}
</script>
