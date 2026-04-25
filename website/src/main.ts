import 'clui-vue/style.css'
import 'clui-vue/styles/base'

import { createApp } from 'vue'
import VWave from 'v-wave'
import CluiVue from 'clui-vue'
import App from './App.vue'

const app = createApp(App)
app.use(VWave, {})
app.use(CluiVue)
app.mount('#app')
