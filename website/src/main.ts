import 'clui-vue/styles/base'

import { createApp } from 'vue'
import VWave from 'v-wave'
import CluiVue from 'clui-vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(VWave, {})
app.use(CluiVue)
app.mount('#app')
