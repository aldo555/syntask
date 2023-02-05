import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Notifications from 'notiwind'
import App from './App.vue'
import router from './router'

import './assets/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.use(autoAnimatePlugin).use(Notifications).mount('#app')
