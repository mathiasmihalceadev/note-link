<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 animate__animated animate__fadeIn"></div>
  <div class="fixed inset-0 p-4 flex items-center justify-center z-50 animate__animated animate__fadeIn">
    <div class="w-full lg:max-w-[1100px] relative bg-white p-6 box-shadow rounded-md m-2">
      <img @click="closeModal" class="absolute right-2 top-2 hover:cursor-pointer"
           src="../../../../assets/img/icons/x.svg"
           alt="">
      <h2 v-if="!editTitle" class="text-2xl font-semibold mb-2" @click="editContent('editTitle')">{{
          current.title
        }}</h2>
      <input v-else type="text" class="text-xl py-2 px-2 w-full mb-2 outline-0" v-model="note.title">
      <ul>
        <li v-for="tag in tags" :key="tag" @click="selectTag(tag.name)"
            class="inline-block mr-1 mb-1 cursor-pointer bg-orangeGray/10 font-semibold px-[5px] py-[3px] rounded-md text-[12px] common"
            :class="{orange: tagIsInNote[tag.name]}">
          {{ tag.name }}
        </li>
      </ul>
      <p @click="editContent('editText')" v-if="!editText" class="text-from-editor mt-4">{{ current.text }}</p>
      <textarea v-else placeholder="Write your note here..."
                class="mb-2 text-orangeBlack rounded-md mt-4 py-2 px-2 focus:outline-0 w-full overflow-y-scroll h-40 outline-0"
                v-model="note.text">
        </textarea>
      <div class="flex gap-2 justify-end mt-2">
        <button
            v-if="edit"
            @click="updateNote"
            class="px-4 py-2 bg-orange text-orangeWhite rounded-lg font-semibold hover:bg-orange/90 transition-all duration-100">
          Modify
        </button>
        <button @click="closeModal"
                class="px-4 py-2 bg-white border-[1.5px] border-orangeBlack/20 rounded-lg font-semibold">Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import {useMainStore} from "@/store";
import {ref, watchEffect} from "vue";

export default {
  props: ['current'],
  emits: ['closeModal'],
  data() {
    return {
      note: null,
      editTitle: false,
      editText: false,
      edit: false,
      tagIsInNote: {}
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    editContent(content) {
      this.edit = true
      if (content === 'editTitle') {
        this.editTitle = true
      } else if (content === 'editText') {
        this.editText = true
      }
    },
    updateNote() {
      const existingNotesJson = localStorage.getItem('notes');
      let existingNotes = [];
      // let goodNote = [];
      if (existingNotesJson) {
        existingNotes = JSON.parse(existingNotesJson);
      }

      // 1) for (const note of existingNotes) {
      //   if (note.id === this.note.id) {
      //     goodNote = note
      //     console.log(goodNote)
      //     return
      //   }
      // } // cu for

      const targetNote = existingNotes.find(item => item.id === this.note.id) // 2) in an object
      // const targetNote = existingNotes.filter(item => item.id === this.note.id) // 3) in an array

      let indexToUpdate = existingNotes.findIndex(obj => obj.id === this.note.id);

      targetNote.text = this.note.text
      targetNote.title = this.note.title

      existingNotes[indexToUpdate] = targetNote
      localStorage.setItem('notes', JSON.stringify(existingNotes))
      const mainStore = useMainStore()
      mainStore.loadNotes()
      mainStore.loadTags()

      this.closeModal()

    },
    selectTag(tagName) {
      const noteId = this.note.id
      const mainStore = useMainStore()

      const existingNotesJson = localStorage.getItem('notes');
      let existingNotes = [];
      if (existingNotesJson) {
        existingNotes = JSON.parse(existingNotesJson);
      }

      const targetNote = existingNotes.find(item => item.id === noteId)
      let indexToUpdate = existingNotes.findIndex(obj => obj.id === noteId);

      const isTagSelected = targetNote.tags.includes(tagName);

      if (isTagSelected) {
        targetNote.tags = targetNote.tags.filter(item => item !== tagName)
        this.tagIsInNote[tagName] = false
      } else {
        targetNote.tags.push(tagName)
        this.tagIsInNote[tagName] = true
      }

      existingNotes[indexToUpdate] = targetNote
      localStorage.setItem('notes', JSON.stringify(existingNotes))
      mainStore.loadNotes()
      mainStore.loadTags()
    }
  },
  mounted() {
    this.note = this.current

    const noteId = this.note.id

    const mainStore = useMainStore()
    const tags = mainStore.getTags
    const notes = mainStore.getNotes

    const targetNote = notes.find(item => item.id === noteId)

    tags.forEach(tag => {
      const isTagPresent = targetNote.tags.includes(tag.name)
      this.tagIsInNote[tag.name] = isTagPresent
    })
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

.text-from-editor {
  white-space: pre-wrap;
}

.orange {
  background-color: orange;
  padding: 3px 5px 3px 5px;
  color: white;
  border-radius: 6px;
}
</style>