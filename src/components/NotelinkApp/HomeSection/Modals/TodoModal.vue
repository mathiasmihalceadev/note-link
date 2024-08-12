<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 animate__animated animate__fadeIn"></div>
  <div class="fixed inset-0 flex items-center justify-center z-50 animate__animated animate__fadeIn">
    <div class="w-full lg:max-w-[1000px] relative bg-white p-6 box-shadow rounded-md m-2">
      <img @click="closeModal" class="absolute right-2 top-2 hover:cursor-pointer"
           src="../../../../assets/img/icons/x.svg"
           alt="">
      <h2 class="text-2xl font-bold">Add Todo</h2>
      <p class="text-[14px]">Add a new todo.</p>
      <div class="mb-6 flex flex-col">
        <input type="text" placeholder="Name..." class="text-lg py-2 px-2 w-full" v-model="name">
        <div class="flex gap-4 items-center">
          <input type="text" placeholder="Todo..." class="text-md py-2 px-2 w-2/4" v-model="value">
          <img class="bg-darkOrange p-1 rounded-full w-6 h-6 cursor-pointer hover:bg-orange" @click="addTodo"
               src="@/assets/img/icons/plus.svg" alt="">
        </div>
        <p v-if="todoError" class="mb-6 text-sm text-rose-600 pl-1 font-medium animate__animated animate__fadeInDown">
          Add some content to this todo.</p>
        <div>
          <div v-for="todo in todos" :key="todo"
               class="flex gap-4 p-1 rounded-md w-2/4 items-center justify-between todo-item bg-orangeGray/10 animate__animated animate__fadeInDown">
            <div class="flex items-center gap-2 cursor-pointer">
              <svg @click="changeStatus(todo.id)" v-if="!todo.status" xmlns="http://www.w3.org/2000/svg" width="18"
                   height="18" viewBox="0 0 24 24"
                   fill="none"
                   stroke="#F4BA50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                   class="feather feather-circle">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <svg @click="changeStatus(todo.id)" v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                   viewBox="0 0 24 24" fill="none"
                   stroke="#F4BA50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                   class="feather feather-check-circle">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p class="pb-[2px]" :class="{notelinklinethrough: todo.status }">{{
                  todo.value
                }}</p>
            </div>
            <div @click="deleteTodo(todo.id)"
                 class="cursor-pointer hover:scale-125 transition-all duration-200 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                   stroke="#EA9D0E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                   class="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>
        </div>
        <p v-if="taskError" class="mb-6 text-sm text-rose-600 pl-1 font-medium animate__animated animate__fadeInDown">
          Add at least one todo to the list.</p>
      </div>
      <div class="flex gap-2 justify-end">
        <button @click="closeModal"
                class="px-4 py-2 bg-white border-[1.5px] border-orangeBlack/20 rounded-lg font-semibold">Cancel
        </button>
        <button
            class="px-4 py-2 bg-orange text-orangeWhite rounded-lg font-semibold hover:bg-orange/90 transition-all duration-100"
            @click="addTask">
          Add Todo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useMainStore} from "@/store";

export default {
  emits: ['closeModal'],
  data() {
    return {
      name: '',
      task: {},
      todos: [],
      value: '',
      todoError: false,
      taskError: false
    }
  },
  watch: {
    value: {
      handler(newText, oldText) {
        if (newText.trim() !== '') {
          this.todoError = false
          this.taskError = false
        }

        console.log(oldText)
      },
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    changeStatus(todoId) {
      const goodTodo = this.todos.find(item => item.id === todoId)

      goodTodo.status = !goodTodo.status

      console.log(goodTodo.status)

      let indexToUpdate = this.todos.findIndex(obj => obj.id === todoId);

      this.todos[indexToUpdate] = goodTodo
    },
    addTask() {
      this.taskError = false
      this.todoError = false
      const existingTasksJson = localStorage.getItem('tasks');
      let existingTasks = [];
      if (existingTasksJson) {
        existingTasks = JSON.parse(existingTasksJson);
      }

      const currentDate = new Date()
      this.task.id = currentDate.toISOString()

      if (this.todos.length === 0) {
        this.taskError = true
        return
      }

      this.task.name = this.name

      this.task.todos = this.todos

      existingTasks.push(this.task);

      localStorage.setItem('tasks', JSON.stringify(existingTasks));

      this.todos = []
      this.task = {}
      this.name = ''
      this.value = ''

      const mainStore = useMainStore()
      mainStore.loadTasks()

    },
    deleteTodo(id) {
      const indexToDelete = this.todos.findIndex(obj => obj.id === id);

      this.todos.splice(indexToDelete, 1)
    },
    addTodo() {
      this.taskError = false
      this.todoError = false
      let todo = {}

      const currentDate = new Date()
      todo.id = currentDate.toISOString()

      if (this.value === '') {
        this.todoError = true
        return
      }

      todo.value = this.value

      todo.status = false

      this.todos.push(todo)
      console.log(todo)
      console.log(this.todos)
      this.value = ''
    }
  }
}
</script>

<style scoped>
.notelinklinethrough {
  text-decoration: line-through;
}

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