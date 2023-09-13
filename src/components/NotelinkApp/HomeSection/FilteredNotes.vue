<template>
  <p v-if="notes.length === 0">You have no notes at the moment.</p>
  <div>
    <ul class=" relative text-black rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 z-0"
        id="background">
      <li v-for="note in filteredNotes" :key="note.id"
          @mouseenter="showMore(note.id)"
          @mouseleave="dontShowMore(note.id)"
          @click="handleClick(note.id, $event)"
          class="relative note border-[1px] border-orangeBlack/20 p-4 rounded-sm transition-all duration-200 cursor-pointer animate__animated animate__fadeInLeft">
        <img v-if="mouseOver[note.id]" @click="showSmallMenu(note.id)"
             class="absolute w-7 top-2 right-3 hover:rounded-full hover:bg-orangeBlack/10 hover:cursor-pointer p-1 animate__animated animate__fadeIn common"
             src="@/assets/img/icons/more-horizontal.svg" alt="">
        <div v-if="showMoreMenu[note.id]"
             class="py-1 absolute right-4 top-10 rounded-md box-shadow-sm animate__animated animate__fadeIn z-50 common bg-orangeWhite"
             ref="menu">
          <ul class="text-[14px] text-orangeBlack/80 font-semibold common">
            <li @click="viewNote(note.id)" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">Edit</li>
            <li @click="trashNote(note.id)" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">Move to
              trash
            </li>
            <li class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">Change color</li>
            <li @click="openAddTag(note.id)" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">
              Add/Remove tag
            </li>
            <li @click="makeCopy(note.id)" class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">Make a
              copy
            </li>
          </ul>
        </div>
        <div v-if="isAddTag[note.id]"
             class="text-sm font-medium py-2 px-2 box-shadow-sm bg-orangeWhite absolute right-4 top-10 rounded-md box-shadow-sm animate__animated animate__fadeIn z-50 common">
          <p class="mb-2 text-[14px] text-orangeBlack/80 font-semibold common">Add/Remove tags</p>
          <ul class="flex flex-col gap-1">
            <li v-for="tag in tags" :key="tag" @click="selectTag(note.id, tag.name)"
                class="self-start bg-orangeGray/10 font-semibold px-2 py-1 rounded-md text-[12px] common"
                :class="{orange: tagIsInNote[tag.name]}">
              {{ tag.name }}
            </li>
          </ul>
        </div>
        <div class="flex flex-col justify-between h-full gap-4">
          <div>
            <p class="font-medium text-md md:text-lg">{{ note.title }}</p>
            <div class="mb-2">
              <p v-for="tag in note.tags" :key="tag"
                 class="inline-block mr-1 mb-1 text-[11px] bg-orangeGray/10 font-medium px-2 py-1 rounded-md"
              >{{
                  tag
                }}</p>
            </div>
            <p class="text-[12px] md:text-[14px]"
               v-html="note.text.length > 300 ? `${note.text.slice(0, 300)}...` : note.text"></p>
          </div>
          <div>
            <p class="uppercase text-[10px] md:text-[12px] text-orangeBlack/40 font-semibold">{{ note.day }}
              {{ note.month }},
              {{ note.year }}</p>
          </div>

        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import {useMainStore} from "@/store";
import {ref, watchEffect} from "vue";

export default {
  props: {
    tagsData: Object // Define the prop to accept the copyTags object
  },
  emits: ['viewNote'],
  data() {
    return {
      day: '',
      month: '',
      mouseOver: {},
      showMoreMenu: {},
      isAddTag: {},
      tagIsInNote: {},
    };
  },
  computed: {
    filteredNotes() {
      const selectedTags = Object.keys(this.tagsData).filter(tagName => this.tagsData[tagName]);

      if (selectedTags.length === 0) {
        return this.notes; // No tags selected, return all notes
      } else {
        return this.notes.filter(note => {
          // Check if the note has at least one of the selected tags
          return selectedTags.some(tagName => note.tags.includes(tagName));
        });
      }
    },
  },
  watch: {
    tagsData: {
      handler() {
        // React to changes in the tagsData prop
        // You can trigger a filter operation or any other action here
      },
      deep: true, // Watch for changes in nested properties of tagsData
    },
  },
  methods: {
    viewNote(id) {
      this.showMoreMenu[id] = false
      this.isAddTag[id] = false

      this.$emit('viewNote', id)

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
      this.isAddTag = {}
    },
    handleClick(noteId, event) {
      if (!event.target.classList.contains("common")) {
        this.viewNote(noteId);
      }
    },
    makeCopy(id) {
      const existingNotesJson = localStorage.getItem('notes');
      let existingNotes = [];
      if (existingNotesJson) {
        existingNotes = JSON.parse(existingNotesJson);
      }

      this.showMoreMenu[id] = false

      const goodNote = existingNotes.find(item => item.id === id);
      const copyNote = {...goodNote};

      const currentDate = new Date();
      copyNote.id = currentDate.toISOString();
      copyNote.title = goodNote.title + ' (Copy)';

      existingNotes.push(copyNote);

      localStorage.setItem('notes', JSON.stringify(existingNotes));

      const mainStore = useMainStore();
      mainStore.loadNotes();
    },

    trashNote(id) {
      const existingNotesJson = localStorage.getItem('notes');
      let existingNotes = [];
      if (existingNotesJson) {
        existingNotes = JSON.parse(existingNotesJson);
      }

      existingNotes = existingNotes.map(item => {
        if (item.id === id) {
          return {...item, trash: true}
        } else {
          return item
        }
      })

      localStorage.setItem('notes', JSON.stringify(existingNotes))

      const mainStore = useMainStore()
      mainStore.loadNotes()
      mainStore.loadTrash();
    },
    openAddTag(noteId) {
      for (const otherNoteId in this.isAddTag) {
        if (otherNoteId !== noteId) {
          this.isAddTag[otherNoteId] = false;
        }
      }

      this.isAddTag[noteId] = !this.isAddTag[noteId]
      this.showMoreMenu[noteId] = !this.showMoreMenu[noteId]

      const mainStore = useMainStore()
      const tags = mainStore.getTags
      const notes = mainStore.getNotes

      const targetNote = notes.find(item => item.id === noteId)

      tags.forEach(tag => {
        const isTagPresent = targetNote.tags.includes(tag.name)
        this.tagIsInNote[tag.name] = isTagPresent
      })
    },
    selectTag(noteId, tagName) {
      const mainStore = useMainStore()

      const existingNotesJson = localStorage.getItem('notes');
      let existingNotes = [];
      if (existingNotesJson) {
        existingNotes = JSON.parse(existingNotesJson);
      }

      const targetNote = existingNotes.find(item => item.id === noteId)
      let indexToUpdate = existingNotes.findIndex(obj => obj.id === noteId);

      console.log(targetNote)

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
      notes, tags
    }
  }
}
</script>

<style scoped>
.text-from-editor {
  white-space: pre-wrap;
}

.orange {
  background-color: orange;
  display: inline;
  padding: 2px 4px 2px 4px;
  color: white;
  border-radius: 6px;
}

.bg {
  background-color: red;
}

.note:hover {
  -webkit-box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.18);
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.18);
}
</style>