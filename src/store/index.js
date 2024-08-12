import {defineStore} from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        notes: [],
        tags: [],
        trash: [],
        tasks: [],
        userName: '',
        isLoggedIn: false,
    }),
    getters: {
        getNotes: (state) => state.notes.reverse(),
        getTags: (state) => state.tags.reverse(),
        getTrash: (state) => state.trash.reverse(),
        getTasks: (state) => state.tasks.reverse(),
        getIsLoggedIn: (state) => state.isLoggedIn,
        getName: (state) => state.userName
    },
    actions: {
        loadTags() {
            const data = localStorage.getItem('tags')
            if (data) {
                this.tags = JSON.parse(data)
            }
        },
        loadNotes() {
            const data = localStorage.getItem('notes')
            if (data) {
                this.notes = JSON.parse(data)
            }

            this.notes = this.notes.filter(note => !note.trash)
        },
        loadTrash() {
            const data = localStorage.getItem('notes')
            if (data) {
                this.trash = JSON.parse(data)
            }

            this.trash = this.trash.filter(note => note.trash)
        },
        loadTasks() {
            const data = localStorage.getItem('tasks')
            if (data) {
                this.tasks = JSON.parse(data)
            }
        },
        loadUserName() {
            const data = localStorage.getItem('name')
            if (data) {
                this.userName = data
            }
        },
        loadIsLoggedIn() {
            const data = localStorage.getItem('isLoggedIn')
            if (data) {
                this.isLoggedIn = JSON.parse(data)
            }
        },
        setIsLoggedInTrue() {
            this.isLoggedIn = true
            localStorage.setItem('isLoggedIn', JSON.stringify(true))
        },
        setIsLoggedInFalse() {
            this.isLoggedIn = false
            localStorage.setItem('isLoggedIn', JSON.stringify(false))
        }
    },
})


