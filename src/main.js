import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/style.scss'

import VueBridgeGateway, { $fetch } from 'vue-bridge-gateway'
import interceptError from './plugin/intercept-error'

const app = createApp(App)
const pinia = createPinia()

// register fetch to pinia
pinia.use(({ store }) => {
  store.$fetch = $fetch
})

// register error handler
interceptError($fetch)

// register bridge
app.use(VueBridgeGateway)

app.use(pinia).use(router).mount('#app')
