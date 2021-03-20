import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/index.vue'
import ExcelDrop from '../pages/excel-drop/index.vue'


const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/excel-drop',
        name: 'excel-drop',
        component: ExcelDrop
    }
]

export default createRouter({
    history: createWebHistory(),
    routes: routes
})