import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import MainApp from './App.vue'
import Nav from './Navigation.vue';
import Home from './Home.vue';
import LeetCode from './LeetCode.vue';
import ModelViewer from './ModelViewer.vue';

import * as Common from './common'

const mainApp = createApp(MainApp);
const navigation = createApp(Nav);
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: Common.gPaths[0], component: Home},
        {path: Common.gPaths[1], component: LeetCode},
        {path: Common.gPaths[2], component: ModelViewer}
    ]
});
navigation.use(router);
mainApp.use(router);
navigation.mount('#navigation');
mainApp.mount('#app');
