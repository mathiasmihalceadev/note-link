<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 animate__animated animate__fadeIn"></div>
  <div class="fixed inset-0 flex items-center p-4 justify-center z-50 animate__animated animate__fadeIn">
    <div class="w-full lg:max-w-[1000px] relative bg-white p-6 box-shadow rounded-md m-2">
      <img @click="closeModal" class="absolute right-2 top-2 hover:cursor-pointer"
           src="../../../../assets/img/icons/x.svg"
           alt="">
      <h2 class="text-2xl font-semibold">Add note</h2>
      <p class="mb-2 text-[14px]">Add a new note.</p>
      <div class="mb-6  flex flex-col">
        <input type="text" placeholder="Title" class="text-xl py-2 px-2 w-full" v-model="note.title">
        <textarea placeholder="Write your note here..."
                  class="mb-2 text-orangeBlack border-[1.5px] rounded-md border-orangeBlack/20 py-2 px-2 focus:outline-0 w-full overflow-y-scroll h-40"
                  v-model="note.text"></textarea>
        <p v-if="error" class="mb-6 text-sm text-rose-600 pl-1 font-medium animate__animated animate__fadeInDown">The
          note can't be empty.</p>
        <ul>
          <li @click="selectTag(tag.id, tag.name, $event)"
              class="text-[12px] inline-block mr-1 mb-1 bg-orangeGray/10 font-semibold px-2 py-1 rounded-md hover:cursor-pointer transition-all duration-300"
              v-for="tag in tags" :key="tag.id">
            {{ tag.name }}
          </li>
        </ul>
        <div v-if="inputIsVisibile" class="flex gap-2 mt-2 animate__animated animate__fadeInLeft items-center">
          <input placeholder="#tag"
                 class="h-6 text-[14px]"
                 type="text" v-model="tag.name">
          <img class="bg-orange p-1 rounded-full w-6 h-6 cursor-pointer hover:bg-orange" @click="addTag"
               src="@/assets/img/icons/plus.svg" alt="">
        </div>
        <button v-else @click="toggleInput"
                class="bg-orange text-[14px] font-semibold text-orangeWhite px-2 rounded-md py-1 self-start">Add tag
        </button>
      </div>
      <div class="flex gap-2 justify-end">
        <button @click="closeModal"
                class="px-4 py-2 bg-white border-[1.5px] border-orangeBlack/20 rounded-lg font-semibold">Cancel
        </button>
        <button
            class="px-4 py-2 bg-orange text-orangeWhite rounded-lg font-semibold hover:bg-orange/90 transition-all duration-100"
            @click="addNote">
          Add Note
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useMainStore} from "@/store";
import {ref, watchEffect} from "vue";

export default {
  emits: ['closeModal'],
  data() {
    return {
      note: {id: '', day: '', month: '', year: '', title: '', tags: [], text: '', trash: false},
      error: false,
      copyTags: [],
      inputIsVisibile: false,
      tag: {id: '', name: ''},
    }
  },
  watch: {
    'note.text': {
      handler(newText, oldText) {
        if (newText.trim() !== '') {
          this.error = false
        }

        console.log(oldText)
      },
      deep: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    toggleInput() {
      this.inputIsVisibile = !this.inputIsVisibile
    },
    addTag() {
      const tagsStr = localStorage.getItem('tags')
      let tagsArray = []

      if (tagsStr) {
        tagsArray = JSON.parse(tagsStr)
      }

      this.tag.name = this.tag.name.trim().replace(/#/g, '');

      if (this.tag.name.trim() !== '') {
        const currentDate = new Date()
        this.tag.id = currentDate.toISOString()
        this.tag.name = '#' + this.tag.name.trim()
        tagsArray.push(this.tag)
      } else {
        return
      }

      localStorage.setItem('tags', JSON.stringify(tagsArray))

      const mainStore = useMainStore()
      mainStore.loadTags()

      this.tag = {id: '', name: ''}

      this.inputIsVisibile = false
    },
    addNote() {
      this.error = false
      const existingNotesJson = localStorage.getItem('notes');
      let existingNotes = [];
      if (existingNotesJson) {
        existingNotes = JSON.parse(existingNotesJson);
      }

      if (this.note.text === '') {
        this.error = true
        return
      }

      const currentDate = new Date()
      this.note.id = currentDate.toISOString()

      const options = {month: 'long'};
      this.note.month = currentDate.toLocaleString('en-US', options);

      this.note.day = currentDate.getDate()
      this.note.year = currentDate.getFullYear()

      this.note.tags = this.copyTags

      existingNotes.push(this.note);

      localStorage.setItem('notes', JSON.stringify(existingNotes));

      const mainStore = useMainStore()
      mainStore.loadNotes()

      this.note = {id: '', day: '', month: '', year: '', title: '', tags: [], text: '', trash: false};

      this.$emit('closeModal')
    },
    loadTags() {
      const mainStore = useMainStore()
      mainStore.loadTags()
    },
    clearError() {
      this.error = false;
    },
    selectTag(id, tagName, event) {
      const isTagSelected = this.copyTags.includes(tagName);

      if (isTagSelected) {
        event.target.classList.remove("orange")
        this.copyTags = this.copyTags.filter(item => item !== tagName)
      } else {
        event.target.classList.add("orange")
        const mainStore = useMainStore()
        const tags = mainStore.getTags

        console.log(tags)

        const targetTag = tags.find(tag => tag.id === id);

        if (targetTag) {
          console.log(targetTag)
          this.copyTags.push(targetTag.name)
        } else {
          console.log(false)
        }
      }
    }
  },
  setup() {
    const mainStore = useMainStore()
    const notes = ref(mainStore.getNotes)
    const tags = ref(mainStore.getTags)

    mainStore.loadTags();
    mainStore.loadNotes()

    watchEffect(() => {
      tags.value = mainStore.getTags;
      notes.value = mainStore.getNotes
    });

    return {
      tags
    }
  }
}
</script>


<style scoped>
::-webkit-scrollbar {
  display: none;
}

.orange {
  background-color: #F4BA50 !important;
  color: white;
}

textarea {
  resize: none;
  border: none;
}

.errorClass {
  border: 2px solid rgb(225 29 72);
}

input:focus {
  outline: none;
}

::placeholder {
  font-weight: normal;
  font-style: italic;
}
</style>