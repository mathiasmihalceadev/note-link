<template>
  <p v-if="tasks.length === 0">You have no tasks at the moment.</p>
  <div>
    <ul class=" relative text-black rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        id="background">
      <li v-for="task in tasks" :key="task.id"
          @mouseenter="showMore(task.id)"
          @mouseleave="dontShowMore(task.id)"
          class="relative note border-[1px] border-orangeBlack/20 p-4 rounded-sm transition-all duration-200 cursor-pointer animate__animated animate__fadeInLeft">
        <img v-if="mouseOver[task.id]" @click="showSmallMenu(task.id)"
             class="absolute w-7 top-2 right-3 hover:rounded-full hover:bg-orangeBlack/10 hover:cursor-pointer p-1 animate__animated animate__fadeIn common"
             ref="showMoreButton"
             src="@/assets/img/icons/more-horizontal.svg" alt="">
        <div v-if="showMoreMenu[task.id]"
             class="bg-orangeWhite z-10 py-1 absolute right-4 top-10 rounded-md box-shadow-sm animate__animated animate__fadeIn common"
             ref="menu">
          <ul class="text-[14px] text-orangeBlack/80 font-semibold common">
            <li @click="removeTodo(task.id)"
                class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">
              Remove
            </li>
            <li @click="editTodo(task.id)"
                class="cursor-pointer hover:bg-orangeGray/10 px-3 py-1 common">
              Edit
            </li>
          </ul>
        </div>
        <div class="h-full">
          <div>
            <p class="font-medium text-lg mb-2">{{ task.name }}</p>
            <div class="flex flex-col gap-2">
              <div v-for="todo in task.todos" :key="todo"
                   class="flex items-center justify-between gap-2 text-[13px] bg-orangeGray/5 font-medium px-2 py-1 rounded-md">
                <div class="flex items-center gap-2">
                  <div>
                    <svg @click="changeStatus(task.id, todo.id)" v-if="!todo.status" xmlns="http://www.w3.org/2000/svg"
                         width="18"
                         height="18" viewBox="0 0 24 24"
                         fill="none"
                         stroke="#F4BA50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                         class="feather feather-circle">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <svg @click="changeStatus(task.id,todo.id)" v-else xmlns="http://www.w3.org/2000/svg"
                         width="18"
                         height="18"
                         viewBox="0 0 24 24" fill="none"
                         stroke="#F4BA50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                         class="feather feather-check-circle">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p :class="{notelinklinethrough: todo.status }">{{ todo.value }}</p>
                </div>
                <div v-if="remove[task.id]" @click="deleteTodo(task.id, todo.id)"
                     class="cursor-pointer hover:scale-125 transition-all duration-200 flex justify-center items-center animate__animated animate__fadeInRight">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="#EA9D0E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                       class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div v-if="edit[task.id]" class="flex gap-4 items-center mt-2 animate__animated animate__fadeInDown">
            <input type="text" placeholder="Todo..." class="text-[14px] py-1 px-1 w-full outline-orange outline-1"
                   v-model="value">
            <img class="bg-darkOrange p-1 rounded-full w-6 h-6 cursor-pointer hover:bg-orange" @click="addTodo(task.id)"
                 src="@/assets/img/icons/plus.svg" alt="">
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
  data() {
    return {
      mouseOver: {},
      showMoreMenu: {},
      edit: {},
      remove: {},
      value: ''
    }
  },
  methods: {
    showMore(id) {
      this.mouseOver[id] = true;
    },
    dontShowMore(id) {
      this.mouseOver[id] = false;
    },
    showSmallMenu(id) {
      for (const otherId in this.showMoreMenu) {
        if (otherId !== id) {
          this.showMoreMenu[otherId] = false;
        }
      }
      this.showMoreMenu[id] = !this.showMoreMenu[id];
    },
    deleteTodo(taskId, todoId) {
      const existingTodosJson = localStorage.getItem('tasks');
      let existingTodos = [];
      if (existingTodosJson) {
        existingTodos = JSON.parse(existingTodosJson);
      }

      const goodTask = existingTodos.find(item => item.id === taskId)
      const indexToDelete = goodTask.todos.findIndex(obj => obj.id === todoId);
      goodTask.todos.splice(indexToDelete, 1)

      localStorage.setItem('tasks', JSON.stringify(existingTodos))

      useMainStore().loadTasks()
    },
    editTodo(id) {
      this.showMoreMenu[id] = false
      for (const otherTaskId in this.edit) {
        if (otherTaskId !== id) {
          this.edit[otherTaskId] = false;
        }
      }
      for (const otherTaskId in this.edit) {
        if (otherTaskId !== id) {
          this.remove[otherTaskId] = false;
        }
      }

      this.edit[id] = !this.edit[id]
      this.remove[id] = !this.remove[id]
    },
    addTodo(id) {
      const existingTasksJson = localStorage.getItem('tasks');
      let existingTasks = [];
      if (existingTasksJson) {
        existingTasks = JSON.parse(existingTasksJson);
      }

      const targetTask = existingTasks.find(item => item.id === id)

      let todo = {}

      const currentDate = new Date()
      todo.id = currentDate.toISOString()

      if (this.value === '') {
        return
      }

      todo.value = this.value

      todo.status = false

      console.log(targetTask)

      targetTask.todos.push(todo)

      localStorage.setItem('tasks', JSON.stringify(existingTasks));

      useMainStore().loadTasks()

      this.edit[id] = false

      this.value = ''
    },
    removeTodo(id) {
      const existingTodosJson = localStorage.getItem('tasks');
      let existingTodos = [];
      if (existingTodosJson) {
        existingTodos = JSON.parse(existingTodosJson);
      }

      let indexToDeleteTask = existingTodos.findIndex(obj => obj.id === id)

      existingTodos.splice(indexToDeleteTask, 1)

      localStorage.setItem('tasks', JSON.stringify(existingTodos))

      useMainStore().loadTasks()
    },
    changeStatus(taskId, todoId) {
      const existingTodosJson = localStorage.getItem('tasks');
      let existingTodos = [];
      if (existingTodosJson) {
        existingTodos = JSON.parse(existingTodosJson);
      }

      const goodTask = existingTodos.find(item => item.id === taskId)
      const goodTodo = goodTask.todos.find(item => item.id === todoId)

      goodTodo.status = !goodTodo.status

      // let index = goodTask.todos.findIndex(obj => obj.id == todoId)
      let indexToUpdateTodo = existingTodos.findIndex(obj => obj.id === todoId);

      goodTask.todos[indexToUpdateTodo] = goodTodo

      let indexToUpdateTask = existingTodos.findIndex(obj => obj.id === taskId)

      existingTodos[indexToUpdateTask] = goodTask

      localStorage.setItem('tasks', JSON.stringify(existingTodos))

      const mainStore = useMainStore()
      mainStore.loadTasks()
    },
  },
  setup() {
    const mainStore = useMainStore()
    const tasks = ref(mainStore.getTasks)

    mainStore.loadTasks()

    watchEffect(() => {
      tasks.value = mainStore.getTasks
    });

    return {
      tasks
    }
  }
}
</script>

<style>
.note:hover {
  -webkit-box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.18);
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.18);
}

.notelinklinethrough {
  text-decoration: line-through;
}
</style>