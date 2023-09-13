import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotelinkApp from "@/views/NotelinkApp.vue";
import HomeSection from "@/components/NotelinkApp/HomeSection/HomeSection.vue";
import NotificationsSection from "@/components/NotelinkApp/NotificationsSection.vue";
import TrashSection from "@/components/NotelinkApp/TrashSection.vue";
import NotesArchive from "@/components/NotelinkApp/NotesArchive.vue";
import TodosArchive from "@/components/NotelinkApp/TodosArchive.vue";
import JournalArchive from "@/components/NotelinkApp/JournalArchive.vue";
import SearchResults from "@/components/NotelinkApp/SearchResults.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/notelink',
        name: 'notelink',
        component: NotelinkApp,
        props: true,
        children: [{
            path: 'home',
            component: HomeSection,
            name: 'notes-home',
            // props: () => ({isOpen: NotelinkApp.data().isOpen})
        },
            {
                path: 'notifications',
                component: NotificationsSection
            },
            {
                path: 'search',
                component: SearchResults,
                name: 'SearchResults',
            },
            {
                path: 'trash',
                component: TrashSection
            },
            {
                path: 'todos',
                component: TodosArchive
            },
            {
                path: 'journal',
                component: JournalArchive
            },
            {
                path: 'notes',
                component: NotesArchive,
                name: 'all-notes'
            }],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
