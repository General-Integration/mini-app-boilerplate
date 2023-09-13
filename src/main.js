import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/style.scss'

import VueBridgeGateway from 'vue-bridge-gateway'

const app = createApp(App)
const pinia = createPinia()

// register bridge
app.use(VueBridgeGateway)

app.use(pinia).use(router).mount('#app')
